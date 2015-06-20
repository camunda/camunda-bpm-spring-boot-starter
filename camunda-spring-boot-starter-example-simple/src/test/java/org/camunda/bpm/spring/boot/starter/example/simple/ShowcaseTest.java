package org.camunda.bpm.spring.boot.starter.example.simple;

import static org.junit.Assert.assertTrue;

import org.camunda.bpm.spring.boot.starter.example.simple.Application;
import org.camunda.bpm.spring.boot.starter.example.simple.Showcase;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.Timeout;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { Application.class })
public class ShowcaseTest {

    @Autowired
    private Showcase showcase;

    @Rule
    public Timeout timeout = Timeout.seconds(10);

    @Test
    public void test() {
        showcase.show();
        assertTrue(showcase.finished);
    }
}
