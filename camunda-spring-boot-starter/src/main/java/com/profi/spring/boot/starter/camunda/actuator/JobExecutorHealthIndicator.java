package com.profi.spring.boot.starter.camunda.actuator;

import java.util.HashSet;
import java.util.Set;

import org.camunda.bpm.engine.impl.ProcessEngineImpl;
import org.camunda.bpm.engine.impl.jobexecutor.JobExecutor;
import org.springframework.boot.actuate.health.AbstractHealthIndicator;
import org.springframework.boot.actuate.health.Health.Builder;
import org.springframework.util.Assert;

public class JobExecutorHealthIndicator extends AbstractHealthIndicator {

    private final JobExecutor jobExecutor;

    public JobExecutorHealthIndicator(JobExecutor jobExecutor) {
        Assert.notNull(jobExecutor);
        this.jobExecutor = jobExecutor;
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

    public static class Details {

        private String name;
        private String lockOwner;
        private int lockTimeInMillis;
        private int maxJobsPerAcquisition;
        private int waitTimeInMillis;
        private Set<String> processEngineNames = new HashSet<>();

        private static Details from(JobExecutor jobExecutor) {
            Details details = new Details();
            details.name = jobExecutor.getName();
            details.lockOwner = jobExecutor.getLockOwner();
            details.lockTimeInMillis = jobExecutor.getLockTimeInMillis();
            details.maxJobsPerAcquisition = jobExecutor.getMaxJobsPerAcquisition();
            details.waitTimeInMillis = jobExecutor.getWaitTimeInMillis();
            for (ProcessEngineImpl processEngineImpl : jobExecutor.getProcessEngines()) {
                details.processEngineNames.add(processEngineImpl.getName());
            }

            return details;
        }

        /**
         * @return the name
         */
        public String getName() {
            return name;
        }

        /**
         * @param name
         *            the name to set
         */
        public void setName(String name) {
            this.name = name;
        }

        /**
         * @return the lockOwner
         */
        public String getLockOwner() {
            return lockOwner;
        }

        /**
         * @param lockOwner
         *            the lockOwner to set
         */
        public void setLockOwner(String lockOwner) {
            this.lockOwner = lockOwner;
        }

        /**
         * @return the lockTimeInMillis
         */
        public int getLockTimeInMillis() {
            return lockTimeInMillis;
        }

        /**
         * @param lockTimeInMillis
         *            the lockTimeInMillis to set
         */
        public void setLockTimeInMillis(int lockTimeInMillis) {
            this.lockTimeInMillis = lockTimeInMillis;
        }

        /**
         * @return the maxJobsPerAcquisition
         */
        public int getMaxJobsPerAcquisition() {
            return maxJobsPerAcquisition;
        }

        /**
         * @param maxJobsPerAcquisition
         *            the maxJobsPerAcquisition to set
         */
        public void setMaxJobsPerAcquisition(int maxJobsPerAcquisition) {
            this.maxJobsPerAcquisition = maxJobsPerAcquisition;
        }

        /**
         * @return the waitTimeInMillis
         */
        public int getWaitTimeInMillis() {
            return waitTimeInMillis;
        }

        /**
         * @param waitTimeInMillis
         *            the waitTimeInMillis to set
         */
        public void setWaitTimeInMillis(int waitTimeInMillis) {
            this.waitTimeInMillis = waitTimeInMillis;
        }

        /**
         * @return the processEngineNames
         */
        public Set<String> getProcessEngineNames() {
            return processEngineNames;
        }

        /**
         * @param processEngineNames
         *            the processEngineNames to set
         */
        public void setProcessEngineNames(Set<String> processEngineNames) {
            this.processEngineNames = processEngineNames;
        }

    }

}
