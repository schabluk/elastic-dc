package pl.lusch.elastic.dc.modules;

import org.elasticsearch.common.inject.AbstractModule;

import pl.lusch.elastic.dc.collectors.StatsCollector;

public class StatsModule extends AbstractModule {

	@Override
	protected void configure() {
		
		/* Collect CPU, memory and storage */
        bind(StatsCollector.class).asEagerSingleton();
        
	}

}
