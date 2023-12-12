import { Config } from './config.interface';

/**
 * Config that determines how the dropdown list of years are created for browse-by-date components
 */
export interface UnicConfig extends Config {
  researcherServiceURL: string;
}
