package pl.lusch.elastic.dc.scheduler;

public class EveryFiveSeconds extends Every {
	
	public EveryFiveSeconds(Runnable job) {
		super(job, 5, 5);
	}
	
}
