package com.profi.spring.boot.starter.camunda;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.camunda.bpm.engine.ProcessEngineException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.profi.spring.boot.starter.camunda.test.TestNoJpaApplication;
import com.profi.spring.boot.starter.camunda.test.jpa.domain.TestEntity;
import com.profi.spring.boot.starter.camunda.test.jpa.repository.TestEntityRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { TestNoJpaApplication.class })
@Transactional
public class CamundaNoJpaAutoConfigurationIT extends AbstractCamundaAutoConfigurationIT {

    @Autowired
    private TestEntityRepository testEntityRepository;

    @Test
    public void jpaDisabledTest() {
        TestEntity testEntity = testEntityRepository.save(new TestEntity());
        Map<String, Object> variables = new HashMap<>();
        variables.put("test", testEntity);
        try {
            runtimeService.startProcessInstanceByKey("TestProcess", variables);
            fail();
        } catch (ProcessEngineException e) {
            assertNotNull(e);
        }
    }

    @Test
    public void pojoTest() {
        Map<String, Object> variables = new HashMap<>();
        Pojo pojo = new Pojo();
        variables.put("test", pojo);
        assertNotNull(runtimeService.startProcessInstanceByKey("TestProcess", variables));
    }

    public static class Pojo implements Serializable {

        private static final long serialVersionUID = 1L;

    }
}
