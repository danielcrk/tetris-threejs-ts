/**
 * This creates and handles the info DOM element that displays the current score
 */
export class InfoText {

  private element: HTMLElement;

  constructor(private canvasContainer: HTMLCanvasElement) {
    this.element = this.createInfoElement();
    this.updateScore(0);
  }

  public updateScore(score: number) {
    this.element.innerHTML = 'score <br> <div style="font-size: 24px;">' + score + '</div>';
  }

  private createInfoElement(): HTMLElement {
    const element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.width = '100px';
    element.style.height = '100px';
    element.style.top = '16px';
    element.style.left = '16px';

    element.style.color = '#444';
    element.style.fontFamily = 'Sans-Serif';
    element.style.fontSize = '16px';
    element.style.fontWeight = 'bold';
    element.style.lineHeight = '1';

    this.canvasContainer.appendChild(element);
    return element;
  }

}
