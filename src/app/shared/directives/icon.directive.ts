import { Directive, ElementRef, input, effect, inject } from '@angular/core';

@Directive({
  selector: '[icon]',
})
export class IconDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly $icon = input.required<string>({ alias: 'icon' });
  readonly $size = input<string>('20px', { alias: 'size' });

  constructor() {
    effect(() => {
      const icon = this.$icon();
      const iconSize = this.$size();

      if (icon) {
        const src = `assets/icons/${icon}.svg`;
        this.setupIcon(src, iconSize);
      }
    });
  }

  private setupIcon(src: string, size: string): void {
    const element = this.el.nativeElement;

    element.style.width = size;
    element.style.height = size;
    element.style.minWidth = size;
    element.style.minHeight = size;
    element.style.display = 'inline-block';
    element.style.flexShrink = '0';

    const maskUrl = `url("${src}")`;
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
