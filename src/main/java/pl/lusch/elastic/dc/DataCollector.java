package pl.lusch.elastic.dc;

import java.util.Collection;
import java.util.Collections;

import org.elasticsearch.common.inject.Module;
import org.elasticsearch.plugins.Plugin;

import pl.lusch.elastic.dc.modules.StatsModule;

public class DataCollector extends Plugin
{

	@Override
	public String description() {
		return "Data Collector for ES";
	}

	@Override
	public String name() {
		return "elastic-dc";
	}

	@Override
	public Collection<Module> nodeModules() {
		
		return Collections.<Module>singletonList(
			new StatsModule()
		);
		
	}

}
