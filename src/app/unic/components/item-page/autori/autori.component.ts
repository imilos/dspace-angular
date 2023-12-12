import { Component, Input } from '@angular/core';
import { Researcher } from '../../../models/researcher';
import { ResearcherService } from '../../../services/researcher.service';

@Component({
  selector: 'ds-autori',
  templateUrl: './autori.component.html',
  styleUrls: ['./autori.component.scss']
})
export class AutoriComponent {
  @Input() dc_autori: any;

  public autori: Array<Researcher> = [];

  constructor(private researcherService: ResearcherService) {}

  ngOnInit(): void {
    for(var i=0; i<this.dc_autori.length; i++) {
      this.getResearcher(this.dc_autori[i].authority, i);
    }
  }

  getResearcher(id: string, redni_broj: number): void {
    var researcher: Researcher;
    var autor = this.dc_autori[redni_broj];

    this.researcherService.getResearcher(id)
      .subscribe(researcher => { this.autori[redni_broj] = researcher; this.autori[redni_broj].name = autor.value; });
  }

}
