import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public saveFile(filename: string, blob: Blob): void {
    const tempLink = this.renderer.createElement('a');
    tempLink.setAttribute('href', URL.createObjectURL(blob));
    tempLink.setAttribute('download', filename);
    tempLink.click();
    tempLink.remove();
  }
}
