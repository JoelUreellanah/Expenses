//
//  RNGradientViewManager.m
//  Expenses
//
//  Created by joel ureellanah on 19/10/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNGradientViewManager.h"
#import "RNGradientView.h"
@implementation RNGradientViewManager
RCT_EXPORT_MODULE()
- (UIView *)view {
  return [[RNGradientView alloc] init];
}
RCT_EXPORT_VIEW_PROPERTY(progress, NSNumber);
RCT_EXPORT_VIEW_PROPERTY(cornerRadius, NSNumber);
RCT_EXPORT_VIEW_PROPERTY(fromColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(toColor, UIColor);
@end
