package pl.lusch.elastic.dc.scheduler;

public class EveryHour extends Every {

	public EveryHour(Runnable job) {
		super(job, 10, 60*60);
	}

}
