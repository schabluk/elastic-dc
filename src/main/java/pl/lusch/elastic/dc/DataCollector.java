package pl.lusch.elastic.dc;

import org.elasticsearch.plugins.Plugin;

/**
 * Hello world!
 *
 */
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
}
