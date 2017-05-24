/**
*@license
*Copyright Google Inc. All Rights Reserved.
*
*Use of this source code is governed by an MIT-style license that can be
*found in the LICENSE file at https://angular.io/license
*/

import {Compiler, Injectable, Injector, NgModuleFactoryLoader, NgModuleRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {from} from 'rxjs/observable/from';
import {of } from 'rxjs/observable/of';
import {_catch} from 'rxjs/operator/catch';
import {concatMap} from 'rxjs/operator/concatMap';
import {filter} from 'rxjs/operator/filter';
import {mergeAll} from 'rxjs/operator/mergeAll';
import {mergeMap} from 'rxjs/operator/mergeMap';
import {Route, Routes} from './config';
import {NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart} from './events';
import {Router} from './router';
import {RouterConfigLoader} from './router_config_loader';

/**
 * @whatItDoes Provides a preloading strategy.
 *
 * @experimental
 */
export abstract class PreloadingStrategy {
  abstract preload(route: Route, fn: () => Observable<any>): Observable<any>;
}

/**
 * @whatItDoes Provides a preloading strategy that preloads all modules as quicky as possible.
 *
 * @howToUse
 *
 * ```
 * RouteModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
 * ```
 *
 * @experimental
 */
export class PreloadAllModules implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return _catch.call(fn(), () => of (null));
  }
}

/**
 * @whatItDoes Provides a preloading strategy that does not preload any modules.
 *
 * @description
 *
 * This strategy is enabled by default.
 *
 * @experimental
 */
export class NoPreloading implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> { return of (null); }
}

/**
 * The preloader optimistically loads all router configurations to
 * make navigations into lazily-loaded sections of the application faster.
 *
 * The preloader runs in the background. When the router bootstraps, the preloader
 * starts listening to all navigation events. After every such event, the preloader
 * will check if any configurations can be loaded lazily.
 *
 * If a route is protected by `canLoad` guards, the preloaded will not load it.
 *
 * @stable
 */
@Injectable()
export class RouterPreloader {
  private loader: RouterConfigLoader;
  private subscription: Subscription;

  constructor(
      private router: Router, moduleLoader: NgModuleFactoryLoader, compiler: Compiler,
      private injector: Injector, private preloadingStrategy: PreloadingStrategy) {
    const onStartLoad = (r: Route) => router.triggerEvent(new RouteConfigLoadStart(r));
    const onEndLoad = (r: Route) => router.triggerEvent(new RouteConfigLoadEnd(r));

    this.loader = new RouterConfigLoader(moduleLoader, compiler, onStartLoad, onEndLoad);
  };

  setUpPreloading(): void {
    const navigations = filter.call(this.router.events, (e: any) => e instanceof NavigationEnd);
    this.subscription = concatMap.call(navigations, () => this.preload()).subscribe(() => {});
  }

  preload(): Observable<any> {
    const ngModule = this.injector.get(NgModuleRef);
    return this.processRoutes(ngModule, this.router.config);
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }

  private processRoutes(ngModule: NgModuleRef<any>, routes: Routes): Observable<void> {
    const res: Observable<any>[] = [];
    for (const c of routes) {
      // we already have the config loaded, just recurse
      if (c.loadChildren && !c.canLoad && (<any>c)._loadedConfig) {
        const childConfig = (<any>c)._loadedConfig;
        res.push(this.processRoutes(childConfig.module, childConfig.routes));

        // no config loaded, fetch the config
      } else if (c.loadChildren && !c.canLoad) {
        res.push(this.preloadConfig(ngModule, c));

        // recurse into children
      } else if (c.children) {
        res.push(this.processRoutes(ngModule, c.children));
      }
    }
    return mergeAll.call(from(res));
  }

  private preloadConfig(ngModule: NgModuleRef<any>, route: Route): Observable<void> {
    return this.preloadingStrategy.preload(route, () => {
      const loaded = this.loader.load(ngModule.injector, route);
      return mergeMap.call(loaded, (config: any): any => {
        const c: any = route;
        c._loadedConfig = config;
        return this.processRoutes(config.module, config.routes);
      });
    });
  }
}
