import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Court extends Component {
  componentDidMount() {
    const svg = d3.select(document.getElementById('chart'))
      .append('svg')
      .attr('id', 'svg-court')
      .attr('width', 500)
      .attr('height', 470)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('stroke-width', '3px');

    // Half-court background
    svg.append('rect')
      .attr('width', 500)
      .attr('height', 470)
      .attr('stroke-width', '5px');

    // Free throw circle (upper half)
    svg.append('circle')
      .attr('cx', 250)
      .attr('cy', 280)
      .attr('r', 60);

    // Big box (where players stand during free throws)
    svg.append('rect')
      .attr('x', 170)
      .attr('y', 280)
      .attr('width', 160)
      .attr('height', 190);

    // Free throw circle (lower half)
    svg.append('path')
      .attr('d', 'M190,280 l120,0 A50,50 0 0,1 190,280 z')
      .attr('stroke-dasharray', '14, 14');

    // Small box
    svg.append('rect')
      .attr('x', 190)
      .attr('y', 280)
      .attr('width', 120)
      .attr('height', 190)
      .attr('fill-opacity', 0);

    // Hoop
    svg.append('circle')
      .attr('cx', 250)
      .attr('cy', 420)
      .attr('r', 7.5)
      .attr('stroke', 'gray');

    // Backboard
    svg.append('line')
      .attr('x1', 220)
      .attr('y1', 430)
      .attr('x2', 280)
      .attr('y2', 430)
      .attr('stroke', 'gray');

    // Left Restricted Line
    svg.append('line')
      .attr('x1', 210)
      .attr('y1', 431.5)
      .attr('x2', 210)
      .attr('y2', 417.5)
      .attr('stroke', 'gray');

    // Right Restricted Line
    svg.append('line')
      .attr('x1', 290)
      .attr('y1', 431.5)
      .attr('x2', 290)
      .attr('y2', 417.5)
      .attr('stroke', 'gray');

    // Restricted Arc
    const restrictedArc = d3.arc()
      .innerRadius(40)
      .outerRadius(40)
      .startAngle(90 * (Math.PI / 180))
      .endAngle(90 * (-Math.PI / 180));

    svg.append('path')
      .attr('d', restrictedArc)
      .attr('transform', 'translate(250,420)')
      .attr('stroke', 'gray');

    // Left 3-point line
    svg.append('line')
      .attr('x1', 30)
      .attr('y1', 470)
      .attr('x2', 30)
      .attr('y2', 330);

     // Right 3-point line
    svg.append('line')
      .attr('x1', 470)
      .attr('y1', 470)
      .attr('x2', 470)
      .attr('y2', 330);

    // 3-point Arc
    const threePointArc = d3.arc()
      .innerRadius(237.5)
      .outerRadius(237.5)
      .startAngle(68 * (Math.PI / 180))
      .endAngle(68 * (-Math.PI / 180));

    svg.append('path')
      .attr('d', threePointArc)
      .attr('transform', 'translate(250,420)');

    svg.append('line')
      .attr('x1', 140)
      .attr('y1', 470)
      .attr('x2', 140)
      .attr('y2', 460);

    svg.append('line')
      .attr('x1', 360)
      .attr('y1', 470)
      .attr('x2', 360)
      .attr('y2', 460);

    svg.append('line')
      .attr('x1', 170)
      .attr('y1', 400)
      .attr('x2', 160)
      .attr('y2', 400);

    svg.append('line')
      .attr('x1', 170)
      .attr('y1', 390)
      .attr('x2', 160)
      .attr('y2', 390);

    svg.append('line')
      .attr('x1', 170)
      .attr('y1', 360)
      .attr('x2', 160)
      .attr('y2', 360);

    svg.append('line')
      .attr('x1', 170)
      .attr('y1', 330)
      .attr('x2', 160)
      .attr('y2', 330);

    svg.append('line')
      .attr('x1', 330)
      .attr('y1', 400)
      .attr('x2', 340)
      .attr('y2', 400);

    svg.append('line')
      .attr('x1', 330)
      .attr('y1', 390)
      .attr('x2', 340)
      .attr('y2', 390);

    svg.append('line')
      .attr('x1', 330)
      .attr('y1', 360)
      .attr('x2', 340)
      .attr('y2', 360);

    svg.append('line')
      .attr('x1', 330)
      .attr('y1', 330)
      .attr('x2', 340)
      .attr('y2', 330);
  }

  render() {
    return <div id="chart" />;
  }
}
