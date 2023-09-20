#import "AppDelegate.h"
// #import "MapKit"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <GoogleMaps/GoogleMaps.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
//#import "RNFirebaseMessaging.h"
#import <Firebase.h>
// #import "RNFirebaseNotifications.h" 
// #import "GoogleMaps/GoogleMaps.h"
// #import <GoogleMaps>
#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate
- (BOOL)application:(UIApplication *)application 
            openURL:(NSURL *)url 
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
  ];
  // Add any custom logic here.
  return handled;
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyDwpw4ybchPKVuvmcyXql9mIGY7nC_EHQA"];
  if ([FIRApp defaultApp] == nil) {
     [FIRApp configure];
    //  [RNFirebaseNotifications configure];
   }
//  [RNFirebaseNotifications configure];
//  if ([UNUserNotificationCenter class] != nil) {
//      // iOS 10 or later
//      // For iOS 10 display notification (sent via APNS)
//      [UNUserNotificationCenter currentNotificationCenter].delegate = self;
//      UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
//          UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
//      [[UNUserNotificationCenter currentNotificationCenter]
//          requestAuthorizationWithOptions:authOptions
//          completionHandler:^(BOOL granted, NSError * _Nullable error) {
//            // ...
//          }];
//    } else {
//      // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
//      UIUserNotificationType allNotificationTypes =
//      (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
//      UIUserNotificationSettings *settings =
//      [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
//      [application registerUserNotificationSettings:settings];
//    }
//    [application registerForRemoteNotifications];
//  if ([UNUserNotificationCenter class] != nil) {
//    // iOS 10 or later
//    // For iOS 10 display notification (sent via APNS)
//    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
//    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
//    UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
//    [FIRMessaging messaging].delegate = self;
//    [[UNUserNotificationCenter currentNotificationCenter]
//     requestAuthorizationWithOptions:authOptions
//     completionHandler:^(BOOL granted, NSError * _Nullable error) {
//       if (error) { NSLog(@"%@", error); }
//     }];
//  } else {
//    // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
//    UIUserNotificationType allNotificationTypes =
//    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
//    UIUserNotificationSettings *settings =
//    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
//    [application registerUserNotificationSettings:settings];
//  }
//[application registerForRemoteNotifications];
//[FIRMessaging messaging].delegate = self;
//
//  [[FIRInstanceID instanceID] instanceIDWithHandler:^(FIRInstanceIDResult * _Nullable result,
//                                                      NSError * _Nullable error) {
//    if (error != nil) {
//      NSLog(@"Error fetching remote instance ID: %@", error);
//    } else {
//      NSLog(@"Remote instance ID token: %@", result.token);
//    }
//  }];
//
  // [FIRMessaging messaging].autoInitEnabled = YES;
  // [RNFirebaseNotifications configure];
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"figma_app"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  return YES;
}
 -(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
 {
    NSLog(@"🟢 Notification received in foreground!");
   completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
 NSDictionary *dict = @{ @"key" : @"asd", @"key2" : @"qwe"}; // This is a test, this object is correctly passed to React Native
      NSLog(@"notification.request: %@", notification.request);
      [RNCPushNotificationIOS didReceiveRemoteNotification:dict ];
 }
 // Required for the register event.
 - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
 {
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
 }
 // Required for the notification event. You must call the completion handler after handling the remote notification.
 - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
 fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
 {
  //  NSLog(@"push-notification received: %@");
   [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
 }
 // Required for the registrationError event.
 - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
 {
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
 }
//  -(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
// {
//   completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
// }
// -(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
// {
//   completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
// }
 // Required for localNotification event
 - (void)userNotificationCenter:(UNUserNotificationCenter *)center
 didReceiveNotificationResponse:(UNNotificationResponse *)response
          withCompletionHandler:(void (^)(void))completionHandler
 {
   [RNCPushNotificationIOS didReceiveNotificationResponse:response];
 }
 - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
 [RNCPushNotificationIOS didReceiveLocalNotification:notification];
}
-(void) callNotification: (NSDictionary*) userInfo {
[RNCPushNotificationIOS didReceiveRemoteNotification:userInfo];
}
//- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
//    NSLog(@"FCM registration token: %@", fcmToken);
//    // Notify about received token.
//    NSDictionary *dataDict = [NSDictionary dictionaryWithObject:fcmToken forKey:@"token"];
//    [[NSNotificationCenter defaultCenter] postNotificationName:
//     @"FCMToken" object:nil userInfo:dataDict];
//}
//
//- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
//  [FIRMessaging messaging].APNSToken = deviceToken;
//  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
//}
//
//- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
//{
//  [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
//}
//
//// Required for the notification event. You must call the completion handler after handling the remote notification.
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
//{
//  [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
//  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//}
//
//// Required for the registrationError event.
//- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
//{
//  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
//}
//
//// Required for the localNotification event.
//- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
//{
//  [RNCPushNotificationIOS didReceiveLocalNotification:notification];
//}
//
//// Called when a notification is delivered to a foreground app.
//-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
//  {
//    NSDictionary *userInfo = notification.request.content.userInfo;
//    [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
//    completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
//  }
// - (void)mapView:(MKMapView *)mapView didFailToLocateUserWithError:(NSError *)error{
//     NSLog(@"didFailToLocateUserWithError %@", error.description);
// }

// - (void)mapViewDidFailLoadingMap:(MKMapView *)mapView withError:(NSError *)error{
//     NSLog(@"mapViewDidFailLoadingMap %@", error.description);
// }
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
