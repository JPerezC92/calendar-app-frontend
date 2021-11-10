export class ApplicationSide {
  static get isServer() {
    return typeof window === "undefined";
  }

  static get isBrowser() {
    return !this.isServer;
  }
}
