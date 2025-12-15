import { Directive, ElementRef, input, effect, inject } from '@angular/core';

@Directive({
  selector: 'img[appIcon]',
})
export class IconDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly $appIcon = input.required<string>({ alias: 'appIcon' });
  readonly $size = input<string>('20px', { alias: 'size' });

  constructor() {
    effect(() => {
      const name = this.$appIcon();
      const iconSize = this.$size();

      if (name) {
        this.setupIcon(name, iconSize);
      }
    });
  }

  private setupIcon(name: string, size: string): void {
    const element = this.el.nativeElement;
    const iconPath = `assets/icons/${name}.svg`;

    element.style.width = size;
    element.style.height = size;
    element.style.minWidth = size;
    element.style.minHeight = size;
    element.style.display = 'inline-block';
    element.style.flexShrink = '0';

    const maskUrl = `url("${iconPath}")`;
    element.style.setProperty('mask-image', maskUrl);
    element.style.setProperty('-webkit-mask-image', maskUrl);
    element.style.setProperty('mask-size', 'contain');
    element.style.setProperty('mask-repeat', 'no-repeat');
    element.style.setProperty('mask-position', 'center');
    element.style.setProperty('-webkit-mask-size', 'contain');
    element.style.setProperty('-webkit-mask-repeat', 'no-repeat');
    element.style.setProperty('-webkit-mask-position', 'center');

    element.style.backgroundColor = 'var(--color-primary-dark)';
    element.style.transition = 'background-color 0.2s ease';
  }
}
