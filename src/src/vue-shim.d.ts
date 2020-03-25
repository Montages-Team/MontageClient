declare module "*.vue" {
    import Vue from "vue";
    export default Vue;

}

declare module "body-scroll-lock" {
  export interface BodyScrollOptions {
    reserveScrollBarGap: boolean;
  }

  export function disableBodyScroll(
    targetElement: HTMLElement,
    options?: BodyScrollOptions
  ): void;

  export function enableBodyScroll(targetElement: HTMLElement): void;

  export function clearAllBodyScrollLocks(): void;
}