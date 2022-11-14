import {Component, ElementRef, OnInit} from '@angular/core';
import {PlateService} from '../../services/plate.service';

@Component({
  selector: 'app-workflow-designer-plate',
  templateUrl: './workflow-designer-plate.component.html',
  styleUrls: ['./workflow-designer-plate.component.scss']
})
export class WorkflowDesignerPlateComponent implements OnInit {

  constructor(
    private readonly plateService: PlateService,
    private readonly elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.setFakeData();
      this.preparePlate();
    }, 200);
  }


  setFakeData() {

    const {dia, shapes, linkTools, connectors} = this.plateService.jointObject;
    const {Polygon, Ellipse, Rect, toDeg} = this.plateService.gObject;
    const {TangentDirections} = connectors.curve;

    const paperElement = this.elementRef.nativeElement.querySelector('.paper');
    const bound = paperElement.getBoundingClientRect();
    console.log(bound);

    const graph = new dia.Graph({}, {cellNamespace: shapes});
    const paper = new dia.Paper({
      el: paperElement,
      model: graph,
      cellViewNamespace: shapes,
      width: '100vw',
      height: `calc(100vh - ${bound.top+10}px)`,
      gridSize: 1,
      async: true,
      sorting: dia.Paper.sorting.APPROX,
      background: {color: '#F3F7F6'},
      snapLinks: true,
      highlighting: {
        default: {
          name: 'mask',
          options: {
            attrs: {
              ...(this.plateService.default.highlighterAttributes)
            }
          }
        }
      },
      // This demo does not use the connection points
      defaultConnectionPoint: {name: 'anchor'},
      connectionStrategy: function (end: any, view: any, _: any, coords: any) {
        const {x, y} = view.model.getBoundaryPoint(coords);
        end.anchor = {
          name: 'topLeft',
          args: {
            dx: x,
            dy: y,
            rotate: true
          }
        };
      },
      defaultConnector: function (sourcePoint: any, targetPoint: any, route: any, _: any, linkView: any) {
        const {model: link} = linkView;
        const targetElement = link.getTargetElement();
        const sourceElement = link.getSourceElement();
        const options = {
          targetDirection: targetElement ? targetElement.getCurveDirection(targetPoint) : TangentDirections.AUTO,
          sourceDirection: sourceElement ? sourceElement.getCurveDirection(sourcePoint) : TangentDirections.AUTO,
        };
        return connectors.curve(sourcePoint, targetPoint, route, options, linkView);
      },
      defaultLink: () => new this.plateService.shapesRepository.Link()
    });

    paper.svg.style.overflow = 'visible';
    paper.el.style.border = '1px solid #E5E5E5';
    paper.on({
      'cell:mouseenter': (view: any) => {
        this.plateService.addTools(view);
      },
      'cell:mouseleave': (view: any) => {
        this.plateService.removeTools(view);
      }
    });

    graph.on({
      'add': (cell: any) => {
        this.plateService.addTools(cell.findView(paper));
      }
    });

    const all: any[] = [];
    const rhombus = new this.plateService.shapesRepository.RhombusShape({
      position: {x: 100, y: 150}
    });
    const rectangle = new this.plateService.shapesRepository.RectangleShape({
      position: {x: 300, y: 250}
    });
    const ellipse = new this.plateService.shapesRepository.EllipseShape({
      position: {x: 600, y: 450}
    });

    all.push(rhombus);
    all.push(rectangle);
    all.push(ellipse);


    graph.resetCells(all);

// const link1 = new Link({
//     source: {
//         id: rectangle.id,
//         anchor: {
//             name: 'bottom'
//         }
//     },
//     target: {
//         id: rhombus.id,
//         anchor: {
//             name: 'topLeft',
//             args: {
//                 dx: 113.6,
//                 dy: 48.2,
//                 rotate: true
//             }
//         }
//     }
// });
//
// const link2 = new Link({
//     source: {
//         id: rectangle.id,
//         anchor: {
//             name: 'bottom'
//         }
//     },
//     target: {
//         id: ellipse.id,
//         anchor: {
//             name: 'topLeft',
//             args: {
//                 dx: 112.2,
//                 dy: 7,
//                 rotate: true
//             }
//         }
//     }
// });
//
// const link3 = new Link({
//     source: {
//         id: ellipse.id,
//         anchor: {
//             name: 'topLeft',
//             args: {
//                 dx: 8.893956250391483,
//                 dy: 52.07374751827297,
//                 rotate: true
//             }
//         }
//     },
//     target: {
//         id: rhombus.id,
//         anchor: {
//             name: 'topLeft',
//             args: {
//                 dx: 98.00000000000001,
//                 dy: 56,
//                 rotate: true
//             }
//         }
//     }
// });
// graph.resetCells([
//     rectangle,
//     ellipse,
//     rhombus,
//     // link1,
//     // link2,
//     // link3
// ]);
  }

  preparePlate() {

  }

}
