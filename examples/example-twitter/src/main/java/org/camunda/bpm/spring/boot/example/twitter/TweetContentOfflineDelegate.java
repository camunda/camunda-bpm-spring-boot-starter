package org.camunda.bpm.spring.boot.example.twitter;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;

import javax.inject.Named;

/**
 * Use if you don't want to access Twitter but just to do some sysout
 * @author ruecker
 */
@Service("tweetAdapter")
public class TweetContentOfflineDelegate implements JavaDelegate {

  public void execute(DelegateExecution execution) throws Exception {
    String content = (String) execution.getVariable("content");

    System.out.println("\n\n\n######\n\n\n");
    System.out.println("NOW WE WOULD TWITTER: '" + content + "'");
    System.out.println("\n\n\n######\n\n\n");
  }

}
