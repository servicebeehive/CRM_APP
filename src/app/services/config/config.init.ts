import { ConfigService } from './config.service';

// @dynamic

export class ConfigInit {
  static loadConfig(config: ConfigService): () => Promise<boolean> {
    return (): Promise<boolean> =>
      new Promise<boolean>((resolve: (a: boolean) => void): void => {
        const rawFile = new XMLHttpRequest();
        rawFile.open('GET', './assets/config/config.json', false);
        rawFile.onreadystatechange = () => {
          if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
              config.setSettings(JSON.parse(rawFile.responseText));
              resolve(true);
            }
          }
        };
        rawFile.send(null);
      });
  }
}
