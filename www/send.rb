require 'rubygems'
require 'pushmeup'
GCM.host = 'https://android.googleapis.com/gcm/send'
GCM.format = :json
GCM.key = "AIzaSyAwMopNxXnRaHbZSZYT5kbhjAsWfVArhdk"
destination = ["APA91bGiTAY1ue8AugmVezW6pX8NJJ3gtIFBvSzI8gOlxjDUeGqLCHA6BXB0I3mBb06mb6wj7GWlG6h44yifJvIuqRPW-ADPe-mUYv94IEe6NtpV36IgBmcB9I6KuJk_Uq1Ci0RbBDPCisZ6yWlhGriSentgTUUMww"]
data = {:message => "PhoneGap Build rocks!", :msgcnt => "1", :soundname => "img/beep.wav"}

GCM.send_notification( destination, data)