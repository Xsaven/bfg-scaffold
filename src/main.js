/**
 * Import vue injector
 */
import VueInjector from './VueInjector'


/**
 * Build application with injector
 */
(new VueInjector())
    .make()
    .mount();
