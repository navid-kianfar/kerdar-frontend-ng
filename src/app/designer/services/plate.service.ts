import {Injectable} from '@angular/core';


// Theme
const highlighterAttributes = {
  'stroke': 'green',
  'stroke-width': 2,
  'stroke-linecap': 'butt',
  'stroke-linejoin': 'miter',
};
const connectToolAttributes = {
  'fill': 'none',
  'stroke-width': 2,
  'stroke-opacity': 1,
  'stroke': 'gray',
  'cursor': 'cell',
};
const lineAttributes = {
  stroke: 'rgb(254, 133, 79)',
  strokeWidth: 2,
};
const labelAttributes = {
  textVerticalAnchor: 'middle',
  textAnchor: 'middle',
  x: 'calc(.5*w)',
  y: 'calc(.5*h)',
  fill: 'rgb(254, 133, 79)',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  fontVariant: 'small-caps',
  pointerEvents: 'none',
};
const bodyAttributes = {
  stroke: 'rgb(254, 133, 79)',
  cursor: 'grab',
  fontSize: 15,
  whiteSpace: 'pre',
  textAnchor: 'middle',
  fontFamily: "Roboto Condensed",
  fontWeight: 'normal',
  fill: 'transparent',
  strokeWidth: 2,
  strokeDasharray: '10, 5',
};
const ShapeTypes = {
  BASE: 'Base',
  RHOMBUS: 'Rhombus',
  RECTANGLE: 'Rectangle',
  ELLIPSE: 'Ellipse',
  LINK: 'Link',
};

@Injectable({
  providedIn: 'root'
})
export class PlateService {
  jointObject: any = undefined;
  gObject: any = undefined;
  shapesRepository: any = {};
  default = {
    highlighterAttributes, connectToolAttributes, lineAttributes,
    labelAttributes, bodyAttributes, ShapeTypes
  };

  constructor() {
    this.defineGlobalVariables();
    this.defineShapes();
  }

  defineGlobalVariables() {
    this.jointObject = (window as any).joint;
    this.gObject = (window as any).g;
    //this.jointObject.setTheme('dark');
  }

  defineShapes() {
    const {dia, shapes, linkTools, connectors} = this.jointObject;
    const {Polygon, Ellipse, Rect, toDeg} = this.gObject;
    const {TangentDirections} = connectors.curve;

    const BaseShape = dia.Element.define(ShapeTypes.BASE, {
      z: 1
    } as any, {
      getConnectToolMarkup() {
        return [{
          tagName: 'rect',
          attributes: {
            ...this.size(),
            ...connectToolAttributes
          }
        }];
      },

      getCurveDirection() {
        return TangentDirections.AUTO;
      },

      getBoundaryPoint(point: any, snapRadius = 20) {
        const bbox = this.getBBox();
        const angle = this.angle();
        // Relative to the element's position
        const relPoint = point.clone().rotate(bbox.center(), angle).difference(bbox.topLeft());
        const relBBox = new Rect(0, 0, bbox.width, bbox.height);
        if (!relBBox.containsPoint(relPoint)) {
          const relCenter = relBBox.center();
          const relTop = relBBox.topMiddle();
          const relLeft = relBBox.leftMiddle();
          if (Math.abs(relTop.x - relPoint.x) < snapRadius) {
            return (relCenter.y > relPoint.y) ? relTop : relBBox.bottomMiddle();
          }
          if (Math.abs(relLeft.y - relPoint.y) < snapRadius) {
            return (relCenter.x > relPoint.x) ? relLeft : relBBox.rightMiddle();
          }
        }
        return this.getClosestBoundaryPoint(relBBox, relPoint);
      },

      getClosestBoundaryPoint(bbox: any, point: any) {
        return bbox.pointNearestToPoint(point);
      },

      getTools() {
        return [
          new linkTools.Connect({
            focusOpacity: 0,
            markup: this.getConnectToolMarkup()
          })
        ];
      }
    } as any);
    const Link = shapes.standard.Link.define(ShapeTypes.LINK, {
      attrs: {
        line: {
          ...lineAttributes
        }
      },
      z: 2
    } as any, {
      getTools() {
        return [
          new linkTools.Vertices(),
          new linkTools.Remove(),
          new linkTools.SourceArrowhead(),
          new linkTools.TargetArrowhead(),
        ];
      }
    } as any);
    const RhombusShape = BaseShape.define(ShapeTypes.RHOMBUS, {
      size: {width: 140, height: 70},
      attrs: {
        root: {
          highlighterSelector: 'body'
        },
        body: {
          d: 'M calc(.5*w) 0 calc(w) calc(.5*h) calc(.5*w) calc(h) 0 calc(.5*h) Z',
          ...bodyAttributes
        },
        label: {
          text: 'Rhombus',
          ...labelAttributes
        }
      }
    } as any, {
      markup: [{
        tagName: 'path',
        selector: 'body'
      }, {
        tagName: 'text',
        selector: 'label'
      }],

      getConnectToolMarkup() {
        const {width, height} = this.size();
        return [{
          tagName: 'path',
          attributes: {
            d: `M ${width / 2} 0 ${width} ${height / 2} ${width / 2} ${height} 0 ${height / 2} Z`,
            ...connectToolAttributes
          }
        }];
      },

      getCurveDirection(point: any) {
        const bbox = this.getBBox();
        const angle = bbox.center().angleBetween(point, bbox.topMiddle());
        if (angle % 90 === 0) {
          return 'auto';
        }
        let ratio = bbox.height / bbox.width;
        if ((angle % 180) < 90) {
          ratio = 1 / ratio;
        }
        return 360 - Math.floor(angle / 90) * 90 + toDeg(Math.atan(ratio));
      },

      getClosestBoundaryPoint(bbox: any, point: any) {
        const rhombus = new Polygon([
          bbox.topMiddle(),
          bbox.rightMiddle(),
          bbox.bottomMiddle(),
          bbox.leftMiddle(),
        ]);
        return rhombus.closestPoint(point);
      }
    } as any);
    const RectangleShape = BaseShape.define(ShapeTypes.RECTANGLE, {
      size: {width: 140, height: 70},
      attrs: {
        root: {
          highlighterSelector: 'body'
        },
        body: {
          width: 'calc(w)',
          height: 'calc(h)',
          ...bodyAttributes
        },
        label: {
          text: 'Rectangle',
          ...labelAttributes
        }
      }
    } as any, {
      markup: [{
        tagName: 'rect',
        selector: 'body',
      }, {
        tagName: 'text',
        selector: 'label'
      }]
    } as any);
    const EllipseShape = BaseShape.define(ShapeTypes.ELLIPSE, {
      size: {width: 140, height: 70},
      attrs: {
        root: {
          highlighterSelector: 'body'
        },
        body: {
          cx: 'calc(.5*w)',
          cy: 'calc(.5*h)',
          rx: 'calc(.5*w)',
          ry: 'calc(.5*h)',
          ...bodyAttributes
        },
        label: {
          text: 'Ellipse',
          ...labelAttributes
        }
      }
    } as any, {
      markup: [{
        tagName: 'ellipse',
        selector: 'body'
      }, {
        tagName: 'text',
        selector: 'label'
      }],

      getConnectToolMarkup() {
        const {width, height} = this.size();
        return [{
          tagName: 'ellipse',
          attributes: {
            'rx': width / 2,
            'ry': height / 2,
            'cx': width / 2,
            'cy': height / 2,
            ...connectToolAttributes
          }
        }];
      },

      getCurveDirection() {
        return TangentDirections.OUTWARDS;
      },

      getClosestBoundaryPoint(bbox: any, point: any) {
        const ellipse = Ellipse.fromRect(bbox);
        return ellipse.intersectionWithLineFromCenterToPoint(point);
      }

    } as any);

    this.shapesRepository = {
      BaseShape, Link, RhombusShape, RectangleShape, EllipseShape
    };
  }

  addTools(view: any) {
    const { paper, model } = view;
    paper.removeTools();
    const tools = new this.jointObject.dia.ToolsView({ tools: model.getTools() });
    view.el.classList.add('active');
    view.addTools(tools);
  }

  removeTools(view: any) {
    view.el.classList.remove('active');
    view.removeTools();
  }
}
