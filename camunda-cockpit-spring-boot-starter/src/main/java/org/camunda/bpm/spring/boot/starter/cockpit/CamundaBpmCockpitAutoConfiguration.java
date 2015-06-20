package org.camunda.bpm.spring.boot.starter.cockpit;

import org.camunda.bpm.spring.boot.starter.CamundaBpmAutoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Import({CamundaBpmCockpitConfiguration.class})
@AutoConfigureAfter(CamundaBpmAutoConfiguration.class)
public class CamundaBpmCockpitAutoConfiguration {

  @Configuration
  @Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
  @ConditionalOnClass(WebSecurityConfigurerAdapter.class)
  protected static class ApplicationSecurity extends WebSecurityConfigurerAdapter {

    @Autowired
    private SecurityProperties security;

    /*
     * (non-Javadoc)
     *
     * @see
     * org.springframework.security.config.annotation.web.configuration.
     * WebSecurityConfigurerAdapter
     * #configure(org.springframework.security.config
     * .annotation.web.builders.WebSecurity)
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
      web.ignoring().antMatchers("/app/**");
      web.ignoring().antMatchers("/api/**");
    }
  }
}
