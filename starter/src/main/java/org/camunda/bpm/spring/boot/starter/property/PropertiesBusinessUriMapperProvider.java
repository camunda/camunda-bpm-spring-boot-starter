package org.camunda.bpm.spring.boot.starter.property;

import java.util.HashMap;
import java.util.Map;

import org.camunda.bpm.engine.rest.util.BusinessUriMapperProvider;
import org.camunda.bpm.engine.rest.util.BusinessUriUtil.BusinessUriMapper;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(PropertiesBusinessUriMapperProvider.PREFIX)
public class PropertiesBusinessUriMapperProvider implements BusinessUriMapperProvider {

    public static final String PREFIX = "camunda.rest";

    private static final class ConcatRestBusinessUriMapper implements BusinessUriMapper {

        private final String businessUriPrefix;

        private ConcatRestBusinessUriMapper(final String businessUriPrefix) {
            this.businessUriPrefix = businessUriPrefix;
        }

        @Override
        public String createBusinessUri(final String businessKey) {
            String result = null;
            if (this.businessUriPrefix != null) {
                result = this.businessUriPrefix + businessKey;
            }
            return result;
        }

    }

    private static Map<String, String> businessUriPrefixes = new HashMap<>();

    public Map<String, String> getBusinessUriPrefixes() {
        return PropertiesBusinessUriMapperProvider.businessUriPrefixes;
    }

    @Override
    public BusinessUriMapper getBusinessUriMapper(final String processDefinitionKey) {
        return new ConcatRestBusinessUriMapper(getBusinessUriPrefixes().get(processDefinitionKey));
    }

}
