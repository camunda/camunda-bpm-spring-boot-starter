package org.camunda.bpm.spring.boot.starter.actuator;

import lombok.Singular;
import lombok.Value;
import org.camunda.bpm.engine.impl.ProcessEngineImpl;
import org.camunda.bpm.engine.impl.jobexecutor.JobExecutor;
import org.springframework.boot.actuate.health.AbstractHealthIndicator;
import org.springframework.boot.actuate.health.Health.Builder;

import java.util.Set;

import static java.util.Objects.requireNonNull;

public class JobExecutorHealthIndicator extends AbstractHealthIndicator {

  private final JobExecutor jobExecutor;

  public JobExecutorHealthIndicator(final JobExecutor jobExecutor) {
    this.jobExecutor = requireNonNull(jobExecutor);
  }

  @Override
  protected void doHealthCheck(Builder builder) throws Exception {
    boolean active = jobExecutor.isActive();
    if (active) {
      builder = builder.up();
    } else {
      builder = builder.down();
    }
    builder.withDetail("jobExecutor", Details.from(jobExecutor));
  }

  @Value
  @lombok.Builder
  public static class Details {

    private String name;
    private String lockOwner;
    private int lockTimeInMillis;
    private int maxJobsPerAcquisition;
    private int waitTimeInMillis;

    @Singular
    private Set<String> processEngineNames;

    private static Details from(JobExecutor jobExecutor) {
      final DetailsBuilder builder = Details.builder()
        .name(jobExecutor.getName())
        .lockOwner(jobExecutor.getLockOwner())
        .lockTimeInMillis(jobExecutor.getLockTimeInMillis())
        .maxJobsPerAcquisition(jobExecutor.getMaxJobsPerAcquisition())
        .waitTimeInMillis(jobExecutor.getWaitTimeInMillis());

      for (ProcessEngineImpl processEngineImpl : jobExecutor.getProcessEngines()) {
        builder.processEngineName(processEngineImpl.getName());
      }

      return builder.build();
    }
  }

}
