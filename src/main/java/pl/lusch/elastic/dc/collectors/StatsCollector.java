package pl.lusch.elastic.dc.collectors;

import java.util.Iterator;
import java.util.concurrent.ScheduledFuture;

import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.admin.cluster.node.stats.NodesStatsRequest;
import org.elasticsearch.action.admin.cluster.node.stats.NodesStatsResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.common.inject.Inject;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.rest.RestController;
import org.json.JSONArray;
import org.json.JSONObject;

import pl.lusch.elastic.dc.scheduler.EveryFiveSeconds;

public class StatsCollector extends BaseCollector {
	
	private final String indexName = "nodes";
	private final String indexType = "stats";
	
    @Inject	
    public StatsCollector(Settings settings, RestController controller, Client client) {
		super(settings, client);
		
		/*
		curl -XDELETE 'localhost:9200/nodes?pretty'
		curl -XPOST 'localhost:9200/nodes?pretty' -d '{
		  "mappings": {
		    "stats": {
		      "properties": {
		        "timestamp": {
		          "type": "date", "index": "not_analyzed"
		        },
		        "host": {
		          "type": "string", "index": "not_analyzed"
		        },
		        "name": {
		          "type": "string", "index": "not_analyzed"
		        }
		      }
		    }
		  }
		}'*/
	}

	@Override
	protected void getCollectorProperties() {
		// TODO get properties
	}

	@Override
	public void sheduleCollectionJob() {
		
		// Collection job
		final Runnable job = new Runnable() {
			public void run() {
				
				// The collector job

				// Prepare and configure statistics request to ES
				NodesStatsRequest nodesStatsRequest = new NodesStatsRequest();
				nodesStatsRequest.indices(false).os(true).jvm(true).fs(true).threadPool(true);
				
				// Request for stats
				clusterClient.admin().cluster().nodesStats(nodesStatsRequest, new ActionListener<NodesStatsResponse>() {

					public void onResponse(NodesStatsResponse response) {

						// Convert response string to JSONArray
						JSONArray responseArray = new JSONArray("["+response+"]");
						JSONObject responseObject = responseArray.getJSONObject(0);
						
						// Get all cluster nodes
						JSONObject nodes = responseObject.getJSONObject("nodes");

						@SuppressWarnings("unchecked")
						Iterator<String> itr = nodes.keys();
						
						while(itr.hasNext()) {
							String nodeId = itr.next();
							
							// Get node object
							JSONObject node = (JSONObject) nodes.get(nodeId);
							String nodeName = node.getString("name");
							
							// Index node statistics back to ES
							IndexResponse re = clusterClient.prepareIndex(indexName, indexType)
								.setSource(node.toString())
								.execute()
								.actionGet();
							
							logger.info(
								"Collected stats at: " + re.getIndex() + "/" + re.getType() + "/" + re.getId() + "."
							);
						}
					}

					public void onFailure(Throwable e) {
						logger.error(e.getMessage(), e.getCause());
					}
					
				});
				
			}
		};
		
		// run job every 5 seconds
		ScheduledFuture<?> jobHandle = (new EveryFiveSeconds(job)).getJobHandle();
		
		if(jobHandle.isDone()) {
			logger.info("The job is done");
		}
	}

}
