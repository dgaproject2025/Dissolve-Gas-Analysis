//Section-1::Local storage of PPM values entered by user in User Input form

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve values from localStorage
  let methane = parseFloat(localStorage.getItem("MethanePPM")) || 0;
  let ethylene = parseFloat(localStorage.getItem("EthylenePPM")) || 0;
  let acetylene = parseFloat(localStorage.getItem("AcetylenePPM")) || 0;

  // Update the respective input fields in DuvalTriangleVisualization.html
  document.getElementById("ppm-input-P1").value = methane;
  document.getElementById("ppm-input-P2").value = ethylene;
  document.getElementById("ppm-input-P3").value = acetylene;

  // Calculate total PPM to determine gas proportions
  let totalPPM = methane + ethylene + acetylene;

  // Calculate proportions and convert to percentage format (rounded to 2 decimals)
  let methanePercent = totalPPM ? ((methane / totalPPM) * 100).toFixed(2) : 0;
  let ethylenePercent = totalPPM ? ((ethylene / totalPPM) * 100).toFixed(2) : 0;
  let acetylenePercent = totalPPM
    ? ((acetylene / totalPPM) * 100).toFixed(2)
    : 0;

  // Avoid division by zero and calculate proportions
  let P1 = totalPPM ? methane / totalPPM : 0;
  let P2 = totalPPM ? ethylene / totalPPM : 0;
  let P3 = totalPPM ? acetylene / totalPPM : 0;

  // Calculate coordinates
  let xCoordinate = (500 * (P2 + 0.5 * P1)).toFixed(2);
  let yCoordinate = (500 * 0.866 * P1).toFixed(2);

  // Update the corresponding div elements
  updateDivContent("cell-23", methanePercent);
  updateDivContent("cell-33", ethylenePercent);
  updateDivContent("cell-43", acetylenePercent);

  // Ensure merged cells get updated correctly
  let xCell = document.querySelector("#cell-24");
  let yCell = document.querySelector("#cell-25");

  if (xCell) {
    xCell.textContent = xCoordinate;
    xCell.style.textAlign = "center";
    xCell.style.fontWeight = "bold";
  }
  if (yCell) {
    yCell.textContent = yCoordinate;
    yCell.style.textAlign = "center";
    yCell.style.fontWeight = "bold";
  }
});

// Function to update the content and ensure center alignment
function updateDivContent(cellId, value) {
  let cell = document.getElementById(cellId);
  if (cell) {
    cell.textContent = value; // Update the text inside the div
    cell.style.textAlign = "center"; // Ensure text is centered
    cell.style.fontWeight = "bold"; // Optional: Make text bold for better visibility
  }
}
//Section-2::Function for Duval Canvas
window.onload = function () {
  /* ************************************************************************* */

  // Get the canvas element and its 2D context.
  const canvas = document.getElementById("duvalCanvas");
  const ctx = canvas.getContext("2d");

  // After CSS sizing, get the actual canvas dimensions.
  const canvasWidth = canvas.offsetWidth;
  const canvasHeight = canvas.offsetHeight;

  // Logical coordinate bounds.
  // x: from -100 to 500; y: from -100 to 500.
  const xMin = -100,
    xMax = 550,
    yMin = -100,
    yMax = 500;

  // Margins for drawing region (for axis labels etc.).
  const marginLeft = 80; // extra space on the left for y-axis labels
  const marginRight = 70; // extra space on the right for vertex C label
  const marginTop = 180;
  const marginBottom = 10; // extra space at bottom for x-axis labels

  // Compute drawing region dimensions.
  const drawWidth = canvasWidth - 0.5 * (marginRight + marginLeft);
  const drawHeight = canvasHeight - (marginTop + marginBottom) * 0.5;

  // Scale factors based on logical coordinate extents.
  const scaleX = drawWidth / (xMax - xMin);
  const scaleY = drawHeight / (yMax - yMin);

  // Transform a logical x-coordinate to a canvas x-coordinate.
  function transformX(x) {
    return marginLeft + (x - xMin) * scaleX;
  }
  // Transform a logical y-coordinate to a canvas y-coordinate (flip y so that yMax maps to top).
  function transformY(y) {
    return canvasHeight - marginBottom - (y - yMin) * scaleY;
  }

  // JSON specification for each zone of the Duval Triangle.
  const polygonData = [
    {
      PolygonName: "D1",
      X: 0,
      Y: 0,
      Order: 1,
      FillColor: "rgb(104, 255, 255)",
      Vertex: "A",
    },
    {
      PolygonName: "D1",
      X: 115,
      Y: 0,
      Order: 2,
      FillColor: "rgb(104, 255, 255)",
    },
    {
      PolygonName: "D1",
      X: 275,
      Y: 277.12,
      Order: 3,
      FillColor: "rgb(104, 255, 255)",
    },
    {
      PolygonName: "D1",
      X: 217.5,
      Y: 376.71,
      Order: 4,
      FillColor: "rgb(104, 255, 255)",
    },
    {
      PolygonName: "D2",
      X: 115,
      Y: 0,
      Order: 5,
      FillColor: "rgb(51, 100, 240)",
    },
    {
      PolygonName: "D2",
      X: 355,
      Y: 0,
      Order: 6,
      FillColor: "rgb(51, 100, 240)",
      Vertex: "C",
    },
    {
      PolygonName: "D2",
      X: 277.5,
      Y: 134.23,
      Order: 7,
      FillColor: "rgb(51, 100, 240)",
    },
    {
      PolygonName: "D2",
      X: 317.5,
      Y: 203.51,
      Order: 8,
      FillColor: "rgb(51, 100, 240)",
    },
    {
      PolygonName: "D2",
      X: 275,
      Y: 277.12,
      Order: 9,
      FillColor: "rgb(51, 100, 240)",
    },
    {
      PolygonName: "DT",
      X: 355,
      Y: 0,
      Order: 10,
      FillColor: "rgb(200,60,200)",
    },
    {
      PolygonName: "DT",
      X: 425,
      Y: 0,
      Order: 11,
      FillColor: "rgb(200,60,200)",
    },
    {
      PolygonName: "DT",
      X: 337.5,
      Y: 151.55,
      Order: 12,
      FillColor: "rgb(200,60,200)",
    },
    {
      PolygonName: "DT",
      X: 365,
      Y: 199.18,
      Order: 13,
      FillColor: "rgb(200,60,200)",
    },
    {
      PolygonName: "DT",
      X: 240,
      Y: 415.68,
      Order: 14,
      FillColor: "rgb(200,60,200)",
    },
    {
      PolygonName: "DT",
      X: 217.5,
      Y: 376.71,
      Order: 15,
      FillColor: "rgb(200,60,200)",
    },
    {
      PolygonName: "DT",
      X: 317.5,
      Y: 203.51,
      Order: 16,
      FillColor: "rgb(200,60,200)",
    },
    {
      PolygonName: "DT",
      X: 277.5,
      Y: 134.23,
      Order: 17,
      FillColor: "rgb(200,60,200)",
    },
    {
      PolygonName: "T1",
      X: 290,
      Y: 329.08,
      Order: 18,
      FillColor: "rgb(255,153,153)",
    },
    {
      PolygonName: "T1",
      X: 300,
      Y: 346.4,
      Order: 19,
      FillColor: "rgb(255,153,153)",
    },
    {
      PolygonName: "T1",
      X: 255,
      Y: 424.34,
      Order: 20,
      FillColor: "rgb(255,153,153)",
    },
    {
      PolygonName: "T1",
      X: 245,
      Y: 424.34,
      Order: 21,
      FillColor: "rgb(255,153,153)",
    },
    {
      PolygonName: "T1",
      X: 240,
      Y: 415.68,
      Order: 22,
      FillColor: "rgb(255,153,153)",
    },
    {
      PolygonName: "T2",
      X: 365,
      Y: 199.18,
      Order: 23,
      FillColor: "rgb(255,204,0)",
    },
    {
      PolygonName: "T2",
      X: 375,
      Y: 216.5,
      Order: 24,
      FillColor: "rgb(255,204,0)",
    },
    {
      PolygonName: "T2",
      X: 300,
      Y: 346.4,
      Order: 25,
      FillColor: "rgb(255,204,0)",
    },
    {
      PolygonName: "T2",
      X: 290,
      Y: 329.08,
      Order: 26,
      FillColor: "rgb(255,204,0)",
    },
    { PolygonName: "T3", X: 425, Y: 0, Order: 27, FillColor: "rgb(0,0,0)" },
    {
      PolygonName: "T3",
      X: 500,
      Y: 0,
      Order: 28,
      FillColor: "rgb(0,0,0)",
      Vertex: "C",
    },
    { PolygonName: "T3", X: 375, Y: 216.5, Order: 29, FillColor: "rgb(0,0,0)" },
    {
      PolygonName: "T3",
      X: 337.5,
      Y: 151.55,
      Order: 30,
      FillColor: "rgb(0,0,0)",
    },
    {
      PolygonName: "PD",
      X: 255,
      Y: 424.34,
      Order: 31,
      FillColor: "rgb(255,0,0)",
    },
    {
      PolygonName: "PD",
      X: 250,
      Y: 433,
      Order: 32,
      FillColor: "rgb(255,0,0)",
      Vertex: "B",
    },
    {
      PolygonName: "PD",
      X: 245,
      Y: 424.34,
      Order: 33,
      FillColor: "rgb(255,0,0)",
    },
  ];

  // Margins and drawing region (see above)
  // The logical coordinate system remains: x from -100 to 500, y from -100 to 500.

  // Group polygons by PolygonName.
  function groupPolygons(data) {
    const groups = {};
    data.forEach((point) => {
      if (!groups[point.PolygonName]) {
        groups[point.PolygonName] = [];
      }
      groups[point.PolygonName].push(point);
    });
    for (const key in groups) {
      groups[key].sort((a, b) => a.Order - b.Order);
    }
    return groups;
  }

  // Draw a polygon.
  function drawPolygon(ctx, points) {
    if (points.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(transformX(points[0].X), transformY(points[0].Y));
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(transformX(points[i].X), transformY(points[i].Y));
    }
    ctx.closePath();
    ctx.fillStyle = points[0].FillColor;
    ctx.fill();
    ctx.stroke();
  }

  // Draw vertex labels with overridden positions:
  //   A: label at logical (-20, 0)
  //   B: label at logical (250, 453)
  //   C: label at logical (520, 0)
  function drawVertexLabels(ctx, points) {
    points.forEach((point) => {
      if (point.Vertex) {
        let labelX, labelY;
        if (point.Vertex === "A") {
          labelX = -35;
          labelY = -5;
        } else if (point.Vertex === "B") {
          labelX = 245;
          labelY = 450;
        } else if (point.Vertex === "C") {
          labelX = 530;
          labelY = -5;
        } else {
          labelX = point.X + 5;
          labelY = point.Y - 5;
        }
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText(point.Vertex, transformX(labelX), transformY(labelY));
      }
    });
  }

  // Draw X-axis markings (horizontal line at logical y = -100).
  function drawXAxisMarks(ctx) {
    const yPos = transformY(-100);
    const startX = transformX(xMin);
    const endX = transformX(xMax);

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(startX, yPos);
    ctx.lineTo(endX, yPos);
    ctx.stroke();

    for (let x = xMin; x <= xMax; x += 50) {
      const cx = transformX(x);
      ctx.beginPath();
      ctx.moveTo(cx, yPos - 5);
      ctx.lineTo(cx, yPos + 5);
      ctx.stroke();
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(x.toString(), cx, yPos + 15);
    }
  }

  // Draw Y-axis markings (vertical line at logical x = -100).
  function drawYAxisMarks(ctx) {
    const xPos = transformX(xMin);
    const startY = transformY(yMax);
    const endY = transformY(yMin);

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(xPos, startY);
    ctx.lineTo(xPos, endY);
    ctx.stroke();

    for (let y = yMin; y <= yMax; y += 50) {
      const cy = transformY(y);
      ctx.beginPath();
      ctx.moveTo(xPos - 5, cy);
      ctx.lineTo(xPos + 5, cy);
      ctx.stroke();
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      ctx.fillText(y.toString(), xPos - 10, cy + 4);
    }
  }

  // Set drawing styles.
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 0;

  // Draw the triangle.
  const groupedPolygons = groupPolygons(polygonData);
  for (const polygon in groupedPolygons) {
    const points = groupedPolygons[polygon];
    drawPolygon(ctx, points);
    drawVertexLabels(ctx, points);
  }

  // Draw axes and tick mark labels.
  drawXAxisMarks(ctx);
  drawYAxisMarks(ctx);

  // ---------- New functions for Arrow marking (Section‑1) ----------

  // Draws an arrow from tail to head with an arrowhead.
  function drawArrow(ctx, tail, head) {
    ctx.strokeStyle = "#333";
    ctx.fillStyle = "#333";
    ctx.lineWidth = 2;

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(tail.x, tail.y);
    ctx.lineTo(head.x, head.y);
    ctx.stroke();

    // Draw arrowhead
    var headLength = 10; // pixels
    var angle = Math.atan2(head.y - tail.y, head.x - tail.x);
    ctx.beginPath();
    ctx.moveTo(head.x, head.y);
    ctx.lineTo(
      head.x - headLength * Math.cos(angle - Math.PI / 6),
      head.y - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      head.x - headLength * Math.cos(angle + Math.PI / 6),
      head.y - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.lineTo(head.x, head.y);
    ctx.fill();
  }

  // Draws rotated text at a given position.
  function drawArrowLabel(ctx, text, pos, angle, align, baseline) {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(angle);
    ctx.font = "14px Arial";
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillStyle = "#000";
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  // Computes arrow endpoints for a side given its endpoints and an offset vector.
  // The arrow is centered at the midpoint and its length is half the side length.
  function computeArrowEndpoints(p1, p2, offsetVec) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var L = Math.sqrt(dx * dx + dy * dy);
    var u = { x: dx / L, y: dy / L };
    var M = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    // Arrow length is half the side length, so half-arrow = L/4.
    var halfArrow = L / 4;
    var tail = { x: M.x - u.x * halfArrow, y: M.y - u.y * halfArrow };
    var head = { x: M.x + u.x * halfArrow, y: M.y + u.y * halfArrow };
    // Offset the entire arrow by the given vector.
    tail.x += offsetVec.x;
    tail.y += offsetVec.y;
    head.x += offsetVec.x;
    head.y += offsetVec.y;
    return { tail: tail, head: head, u: u, M: M };
  } // ----------- Section‑1: Arrow marking parallel to sides AB, BC & CA ------------

  // Define common gaps (in pixels)
  var offsetGap = 20; // perpendicular gap between arrow and side
  var labelGap = 20; // gap from arrow to label

  // First, determine the canvas positions of vertices A, B, and C
  // (using the override positions in drawVertexLabels)
  const A = { x: transformX(-20), y: transformY(0) };
  const B = { x: transformX(250), y: transformY(453) };
  const C = { x: transformX(520), y: transformY(0) };

  // --- Arrow-Parallel-AB ---
  // For side AB (from A to B) with arrowhead pointing toward B.
  // The arrow is drawn on the right of side AB.
  var dxAB = B.x - A.x;
  var dyAB = B.y - A.y;
  var L_AB = Math.sqrt(dxAB * dxAB + dyAB * dyAB);
  var u_AB = { x: dxAB / L_AB, y: dyAB / L_AB };
  // Right perpendicular for AB is (u_AB.y, -u_AB.x)
  var d_AB = { x: offsetGap * u_AB.y, y: offsetGap * -u_AB.x };
  var arrowAB = computeArrowEndpoints(A, B, d_AB);
  drawArrow(ctx, arrowAB.tail, arrowAB.head);
  // Compute left perpendicular unit vector for AB: leftP_AB = (-u_AB.y, u_AB.x)
  var leftP_AB = { x: -u_AB.y, y: u_AB.x };
  // Place label to the left of the arrow (i.e. opposite to the arrow’s offset)
  var labelPosAB = {
    x: arrowAB.M.x + d_AB.x - labelGap * leftP_AB.x,
    y: arrowAB.M.y + d_AB.y - labelGap * leftP_AB.y,
  };
  // Using textAlign "right" so that the label extends leftward from the anchor point
  drawArrowLabel(
    ctx,
    "Methane(CH\u2084)-PPM", // Unicode subscript 4
    labelPosAB,
    Math.atan2(u_AB.y, u_AB.x),
    "center",
    "middle"
  );

  // --- Arrow-Parallel-BC ---
  // For side BC (from B to C) with arrowhead pointing toward C.
  // The arrow is drawn on the right of side BC.
  var dxBC = C.x - B.x;
  var dyBC = C.y - B.y;
  var L_BC = Math.sqrt(dxBC * dxBC + dyBC * dyBC);
  var u_BC = { x: dxBC / L_BC, y: dyBC / L_BC };
  // Right perpendicular for BC is (u_BC.y, -u_BC.x)
  var d_BC = { x: offsetGap * u_BC.y, y: offsetGap * -u_BC.x };
  var arrowBC = computeArrowEndpoints(B, C, d_BC);
  drawArrow(ctx, arrowBC.tail, arrowBC.head);
  // Place label to the right of arrow-Parallel-BC.
  // Add an additional gap (labelGap) along the same right perpendicular direction.
  var labelPosBC = {
    x: arrowBC.M.x + d_BC.x + labelGap * u_BC.y,
    y: arrowBC.M.y + d_BC.y - labelGap * u_BC.x,
  };
  drawArrowLabel(
    ctx,
    "Ethylene(C\u2082H\u2084)-PPM", // Unicode for subscript 2 and 4
    labelPosBC,
    Math.atan2(u_BC.y, u_BC.x),
    "center",
    "middle"
  );

  // --- Arrow-Parallel-CA ---
  // For side CA (from C to A) with arrowhead pointing toward A.
  var dxCA = A.x - C.x;
  var dyCA = A.y - C.y;
  var L_CA = Math.sqrt(dxCA * dxCA + dyCA * dyCA);
  var u_CA = { x: dxCA / L_CA, y: dyCA / L_CA };
  // Use the same perpendicular gap (offsetGap) as for AB.
  // Compute the right perpendicular vector for CA: (u_CA.y, -u_CA.x)
  var d_CA = { x: offsetGap * u_CA.y, y: offsetGap * 1.5 * -u_CA.x };
  // For a horizontal side (u_CA = { -1, 0 }), this gives d_CA = {0, 10}.
  var arrowCA = computeArrowEndpoints(C, A, d_CA);
  drawArrow(ctx, arrowCA.tail, arrowCA.head);

  // Place the label below the arrow by shifting further along the same perpendicular.
  var labelPosCA = {
    x: arrowCA.M.x + d_CA.x,
    y: arrowCA.M.y + d_CA.y + labelGap,
  };

  // Compute the arrow's angle and adjust if needed so the label is upright.
  var angleCA = Math.atan2(u_CA.y, u_CA.x);
  if (angleCA > Math.PI / 2 && angleCA < (3 * Math.PI) / 2) {
    angleCA -= Math.PI;
  }
  drawArrowLabel(
    ctx,
    "Acetylene(C\u2082H\u2082)-PPM",
    labelPosCA,
    angleCA,
    "center",
    "top"
  );

  // ---------- Section-2: Tick Marking on side AB of triangle ABC ----------

  // ---------- Section-2: Tick Marking on side AB of triangle ABC ----------

  // Define the marks with their triangular coordinates.
  var marksAB = [
    { mark: 0, coords: [0, 0, 1] },
    { mark: 10, coords: [0.1, 0, 0.9] },
    { mark: 20, coords: [0.2, 0, 0.8] },
    { mark: 30, coords: [0.3, 0, 0.7] },
    { mark: 40, coords: [0.4, 0, 0.6] },
    { mark: 50, coords: [0.5, 0, 0.5] },
    { mark: 60, coords: [0.6, 0, 0.4] },
    { mark: 70, coords: [0.7, 0, 0.3] },
    { mark: 80, coords: [0.8, 0, 0.2] },
    { mark: 90, coords: [0.9, 0, 0.1] },
    { mark: 100, coords: [1, 0, 0] },
  ];

  // Define tick mark parameters.
  var tickMarkLength = 10; // Tick line length in pixels
  var labelTickGap = 10; // Horizontal gap from tick mark center to label

  // Draw each tick mark on side AB.
  marksAB.forEach(function (item) {
    // Extract P1 from the coordinates and compute logical Cartesian (x, y)
    var P1 = item.coords[0];
    var logicalX = 250 * P1;
    var logicalY = 433 * P1;

    // Transform the logical coordinates to canvas coordinates.
    var center = { x: transformX(logicalX), y: transformY(logicalY) };

    // Draw a horizontal tick mark (5px length) centered at the computed (x,y).
    // (Tick is drawn parallel to side CA which is horizontal.)
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(center.x - tickMarkLength / 2, center.y);
    ctx.lineTo(center.x + tickMarkLength / 2, center.y);
    ctx.stroke();

    // Place the label directly to the left of the tick mark.
    var labelPos = {
      x: center.x - labelTickGap,
      y: center.y,
    };

    // Draw the mark value (label) at the computed position.
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "right"; // Align right so the text extends leftward.
    ctx.textBaseline = "middle";
    ctx.fillText(item.mark.toString(), labelPos.x, labelPos.y);
  });

  // ---------- Section-2: Tick Marking on side BC of triangle ABC ----------

  // Define the marks with their triangular coordinates.
  // Format: { mark: value, coords: [P1, P2, P3] }
  var marksBC = [
    { mark: 0, coords: [1, 0, 0] },
    { mark: 10, coords: [0.9, 0.1, 0] },
    { mark: 20, coords: [0.8, 0.2, 0] },
    { mark: 30, coords: [0.7, 0.3, 0] },
    { mark: 40, coords: [0.6, 0.4, 0] },
    { mark: 50, coords: [0.5, 0.5, 0] },
    { mark: 60, coords: [0.4, 0.6, 0] },
    { mark: 70, coords: [0.3, 0.7, 0] },
    { mark: 80, coords: [0.2, 0.8, 0] },
    { mark: 90, coords: [0.1, 0.9, 0] },
    { mark: 100, coords: [0, 1, 0] },
  ];

  // Tick mark parameters for side BC.
  var tickMarkLength_BC = 10; // Tick mark length in pixels (centered at computed (x,y))
  var labelTickGap_BC = 10; // Gap from tick mark center to label (in the direction of "right" of side BC)

  // For tick marks on side BC, we need the direction of side AB since marks are drawn parallel to AB.
  // Assume u_AB is already computed earlier (for side AB from A to B).
  // (If not, compute it here as done for side AB.)
  // For side BC, we need its unit vector to determine the "right" direction.
  var dxBC = C.x - B.x;
  var dyBC = C.y - B.y;
  var L_BC = Math.sqrt(dxBC * dxBC + dyBC * dyBC);
  var u_BC = { x: dxBC / L_BC, y: dyBC / L_BC };
  // Right perpendicular to side BC is: (u_BC.y, -u_BC.x)
  var rightP_BC = { x: u_BC.y, y: -u_BC.x };

  // Draw each tick mark on side BC.
  marksBC.forEach(function (item) {
    // Extract P1 and P2 from the coordinates.
    var P1 = item.coords[0];
    var P2 = item.coords[1];
    // Derive the logical Cartesian coordinates based on the provided formula:
    // x = 500*(P2 + 0.5*P1), y = 433*P1.
    var logicalX = 500 * (P2 + 0.5 * P1);
    var logicalY = 433 * P1;

    // Transform logical coordinates to canvas coordinates.
    var center = { x: transformX(logicalX), y: transformY(logicalY) };

    // Draw the tick mark line of tickMarkLength_BC (10px) centered at (center.x, center.y)
    // The tick is drawn parallel to side AB, i.e., along the unit vector u_AB.
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(
      center.x - (tickMarkLength_BC / 2) * u_AB.x,
      center.y - (tickMarkLength_BC / 2) * u_AB.y
    );
    ctx.lineTo(
      center.x + (tickMarkLength_BC / 2) * u_AB.x,
      center.y + (tickMarkLength_BC / 2) * u_AB.y
    );
    ctx.stroke();

    // Compute the label position: place it to the right of side BC.
    // Use rightP_BC (the right perpendicular unit vector for side BC) scaled by labelTickGap_BC.
    var labelPos = {
      x: center.x + rightP_BC.x * labelTickGap_BC,
      y: center.y + rightP_BC.y * labelTickGap_BC,
    };

    // Draw the tick mark value (label) at the computed position.
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left"; // Align left so the text extends to the right.
    ctx.textBaseline = "middle";
    ctx.fillText(item.mark.toString(), labelPos.x, labelPos.y);
  });

  // ---------- Section-2: Tick Marking on side CA of triangle ABC (Corrected) ----------

  // Define the marks for side CA using the provided triangular coordinates.
  // Format: { mark: value, coords: [P1, P2, P3] }
  var marksCA = [
    { mark: 0, coords: [0, 1, 0] },
    { mark: 10, coords: [0, 0.9, 0.1] },
    { mark: 20, coords: [0, 0.8, 0.2] },
    { mark: 30, coords: [0, 0.7, 0.3] },
    { mark: 40, coords: [0, 0.6, 0.4] },
    { mark: 50, coords: [0, 0.5, 0.5] },
    { mark: 60, coords: [0, 0.4, 0.6] },
    { mark: 70, coords: [0, 0.3, 0.7] },
    { mark: 80, coords: [0, 0.2, 0.8] },
    { mark: 90, coords: [0, 0.1, 0.9] },
    { mark: 100, coords: [0, 0, 1] },
  ];

  // Tick mark parameters for side CA.
  var tickMarkLength_CA = 10; // Tick mark line length (in pixels)
  var labelTickGap_CA = 10; // Vertical gap (in pixels) from tick mark center to label

  // For side CA, the logical Cartesian coordinates are derived as:
  //   x = 500 * P2,   y = 0.
  // We then transform these into canvas coordinates.
  // The tick mark line is drawn parallel to side BC using u_BC.
  // (Assume that u_BC has been computed previously as:
  //    u_BC = { x: (C.x - B.x) / L_BC, y: (C.y - B.y) / L_BC }
  // )
  marksCA.forEach(function (item) {
    // Extract P2 from the provided coordinates.
    var P2 = item.coords[1];
    // Compute logical coordinates:
    var logicalX = 500 * P2;
    var logicalY = 0;

    // Transform logical coordinates to canvas coordinates.
    var center = { x: transformX(logicalX), y: transformY(logicalY) };

    // Draw a tick mark line of tickMarkLength_CA (10px) centered at (center.x, center.y)
    // and drawn along u_BC (parallel to side BC).
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(
      center.x - (tickMarkLength_CA / 2) * u_BC.x,
      center.y - (tickMarkLength_CA / 2) * u_BC.y
    );
    ctx.lineTo(
      center.x + (tickMarkLength_CA / 2) * u_BC.x,
      center.y + (tickMarkLength_CA / 2) * u_BC.y
    );
    ctx.stroke();

    // Place the label (mark value) below side CA.
    // Since side CA is horizontal, "below" means increasing the y-coordinate.
    var labelPos = {
      x: center.x,
      y: center.y + labelTickGap_CA,
    };

    // Draw the label.
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(item.mark.toString(), labelPos.x, labelPos.y);
  });

  /************************************************************************** */
  // Visualization of Point & Parallel line originating from point inside Duval Triangle on click of submit button
  // Clearization of Point & Parallel line originating from point inside Duval Triangle on click of Yes button of Modal 1 which appear after clicking on Clear Button
  // Function to get user input values and calculate coordinates

  //Section-1::: Function to Plot point inside Duval Triangle
  function plotPointInsideDuvalTriangle() {
    // Retrieve PPM values from input fields
    let methanePPM =
      parseFloat(document.getElementById("ppm-input-P1").value) || 0;
    let ethylenePPM =
      parseFloat(document.getElementById("ppm-input-P2").value) || 0;
    let acetylenePPM =
      parseFloat(document.getElementById("ppm-input-P3").value) || 0;

    // Calculate total PPM
    let totalPPM = methanePPM + ethylenePPM + acetylenePPM;

    // Avoid division by zero
    if (totalPPM === 0) {
      return;
    }

    // Calculate triangular coordinates (P1, P2, P3)
    let P1 = methanePPM / totalPPM;
    let P2 = ethylenePPM / totalPPM;
    let P3 = acetylenePPM / totalPPM;

    // Convert to Cartesian coordinates
    let a = 500 * (P2 + 0.5 * P1);
    let b = 500 * 0.866 * P1;

    // Transform logical coordinates to canvas coordinates
    let transformedX = transformX(a);
    let transformedY = transformY(b);

    // Store visualization data for clearing later
    window.visualizationData = {
      point: { x: transformedX, y: transformedY },
      lines: [],
    };

    // Draw the point inside the Duval Triangle
    drawPoint(transformedX, transformedY);

    // ---------------- ReDraw Line Parallel to CA ----------------
    let xStartCA = 500 * (P2 + 0.5 * P1);
    let yStartCA = 433 * P1;
    let xEndCA = 250 * P1;
    let yEndCA = 433 * P1;

    let transformedXStartCA = transformX(xStartCA);
    let transformedYStartCA = transformY(yStartCA);
    let transformedXEndCA = transformX(xEndCA);
    let transformedYEndCA = transformY(yEndCA);

    drawBoldWhiteLine(
      transformedXStartCA,
      transformedYStartCA,
      transformedXEndCA,
      transformedYEndCA
    );
    window.visualizationData.lines.push({
      x1: transformedXStartCA,
      y1: transformedYStartCA,
      x2: transformedXEndCA,
      y2: transformedYEndCA,
    });

    // ---------------- ReDraw Line Parallel to AB ----------------
    let xStartAB = 500 * (P2 + 0.5 * P1);
    let yStartAB = 433 * P1;
    let xEndAB = 500 * [P2 + 0.5 * (1 - P2)];
    let yEndAB = 433 * (1 - P2);

    let transformedXStartAB = transformX(xStartAB);
    let transformedYStartAB = transformY(yStartAB);
    let transformedXEndAB = transformX(xEndAB);
    let transformedYEndAB = transformY(yEndAB);

    drawBoldWhiteLine(
      transformedXStartAB,
      transformedYStartAB,
      transformedXEndAB,
      transformedYEndAB
    );
    window.visualizationData.lines.push({
      x1: transformedXStartAB,
      y1: transformedYStartAB,
      x2: transformedXEndAB,
      y2: transformedYEndAB,
    });

    // ---------------- ReDraw Line Parallel to BC ----------------
    let xStartBC = 500 * (P2 + 0.5 * P1);
    let yStartBC = 433 * P1;
    let xEndBC = 500 * (1 - P3);
    let yEndBC = 0;

    let transformedXStartBC = transformX(xStartBC);
    let transformedYStartBC = transformY(yStartBC);
    let transformedXEndBC = transformX(xEndBC);
    let transformedYEndBC = transformY(yEndBC);

    drawBoldWhiteLine(
      transformedXStartBC,
      transformedYStartBC,
      transformedXEndBC,
      transformedYEndBC
    );
    window.visualizationData.lines.push({
      x1: transformedXStartBC,
      y1: transformedYStartBC,
      x2: transformedXEndBC,
      y2: transformedYEndBC,
    });
  }

  // Function to draw a perfectly clean, bright white circle ⚪
  function drawPoint(x, y) {
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  // Function to draw a bold white line
  function drawBoldWhiteLine(x1, y1, x2, y2) {
    ctx.save();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  //To keep position of Vertex label intact after clearization
  function drawVertexLabelsaftervisualization(ctx, points) {
    points.forEach((point) => {
      if (point.Vertex) {
        let labelX, labelY;
        if (point.Vertex === "A") {
          labelX = -30;
          labelY = 0;
        } else if (point.Vertex === "B") {
          labelX = 252;
          labelY = 465;
        } else if (point.Vertex === "C") {
          labelX = 530;
          labelY = 0;
        } else {
          labelX = point.X + 5;
          labelY = point.Y - 5;
        }
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText(point.Vertex, transformX(labelX), transformY(labelY));
      }
    });
  }

  // Function to redraw the Duval Triangle after clearization
  function redrawDuvalTriangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Redraw the original Duval Triangle
    for (const polygon in groupedPolygons) {
      const points = groupedPolygons[polygon];
      drawPolygon(ctx, points);
    }

    // Redraw axes and tick marks
    // Call with original data
    drawVertexLabelsaftervisualization(ctx, polygonData);
    // Draw Origial X-Axis marking after clearization
    drawXAxisMarks(ctx);
    // Draw Origial Y-Axis marking after clearization
    drawYAxisMarks(ctx);
    // Draw original Arrow AB after clearization
    drawArrow(ctx, arrowAB.tail, arrowAB.head);
    // Draw original label of Arrow AB after clearization
    drawArrowLabel(
      ctx,
      "Methane(CH\u2084)-PPM", // Unicode subscript 4
      labelPosAB,
      Math.atan2(u_AB.y, u_AB.x),
      "center",
      "middle"
    );
    // Draw original Arrow BC after clearization
    drawArrow(ctx, arrowBC.tail, arrowBC.head);
    // Place label to the right of arrow-Parallel-BC.
    // Add an additional gap (labelGap) along the same right perpendicular direction.
    var labelPosBC = {
      x: arrowBC.M.x + d_BC.x + labelGap * u_BC.y,
      y: arrowBC.M.y + d_BC.y - labelGap * u_BC.x,
    };
    // Draw original label of Arrow BC after clearization
    drawArrowLabel(
      ctx,
      "Ethylene(C\u2082H\u2084)-PPM", // Unicode for subscript 2 and 4
      labelPosBC,
      Math.atan2(u_BC.y, u_BC.x),
      "center",
      "middle"
    );
    // Draw original Arrow CA after clearization
    drawArrow(ctx, arrowCA.tail, arrowCA.head);
    // Draw original Label of Arrow CA after clearization
    drawArrowLabel(
      ctx,
      "Acetylene(C\u2082H\u2082)-PPM",
      labelPosCA,
      angleCA,
      "center",
      "top"
    );
    // Draw each tick mark on side AB.
    marksAB.forEach(function (item) {
      // Extract P1 from the coordinates and compute logical Cartesian (x, y)
      var P1 = item.coords[0];
      var logicalX = 250 * P1;
      var logicalY = 433 * P1;

      // Transform the logical coordinates to canvas coordinates.
      var center = { x: transformX(logicalX), y: transformY(logicalY) };

      // Draw a horizontal tick mark (5px length) centered at the computed (x,y).
      // (Tick is drawn parallel to side CA which is horizontal.)
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(center.x - tickMarkLength / 2, center.y);
      ctx.lineTo(center.x + tickMarkLength / 2, center.y);
      ctx.stroke();

      // Place the label directly to the left of the tick mark.
      var labelPos = {
        x: center.x - labelTickGap,
        y: center.y,
      };

      // Draw the mark value (label) at the computed position.
      ctx.font = "10px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "right"; // Align right so the text extends leftward.
      ctx.textBaseline = "middle";
      ctx.fillText(item.mark.toString(), labelPos.x, labelPos.y);
    });
    // Draw each tick mark on side BC.
    marksBC.forEach(function (item) {
      // Extract P1 and P2 from the coordinates.
      var P1 = item.coords[0];
      var P2 = item.coords[1];
      // Derive the logical Cartesian coordinates based on the provided formula:
      // x = 500*(P2 + 0.5*P1), y = 433*P1.
      var logicalX = 500 * (P2 + 0.5 * P1);
      var logicalY = 433 * P1;

      // Transform logical coordinates to canvas coordinates.
      var center = { x: transformX(logicalX), y: transformY(logicalY) };

      // Draw the tick mark line of tickMarkLength_BC (10px) centered at (center.x, center.y)
      // The tick is drawn parallel to side AB, i.e., along the unit vector u_AB.
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(
        center.x - (tickMarkLength_BC / 2) * u_AB.x,
        center.y - (tickMarkLength_BC / 2) * u_AB.y
      );
      ctx.lineTo(
        center.x + (tickMarkLength_BC / 2) * u_AB.x,
        center.y + (tickMarkLength_BC / 2) * u_AB.y
      );
      ctx.stroke();

      // Compute the label position: place it to the right of side BC.
      // Use rightP_BC (the right perpendicular unit vector for side BC) scaled by labelTickGap_BC.
      var labelPos = {
        x: center.x + rightP_BC.x * labelTickGap_BC,
        y: center.y + rightP_BC.y * labelTickGap_BC,
      };

      // Draw the tick mark value (label) at the computed position.
      ctx.font = "10px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "left"; // Align left so the text extends to the right.
      ctx.textBaseline = "middle";
      ctx.fillText(item.mark.toString(), labelPos.x, labelPos.y);
    });
    // Draw each tick mark on side CA.
    marksCA.forEach(function (item) {
      // Extract P2 from the provided coordinates.
      var P2 = item.coords[1];
      // Compute logical coordinates:
      var logicalX = 500 * P2;
      var logicalY = 0;

      // Transform logical coordinates to canvas coordinates.
      var center = { x: transformX(logicalX), y: transformY(logicalY) };

      // Draw a tick mark line of tickMarkLength_CA (10px) centered at (center.x, center.y)
      // and drawn along u_BC (parallel to side BC).
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(
        center.x - (tickMarkLength_CA / 2) * u_BC.x,
        center.y - (tickMarkLength_CA / 2) * u_BC.y
      );
      ctx.lineTo(
        center.x + (tickMarkLength_CA / 2) * u_BC.x,
        center.y + (tickMarkLength_CA / 2) * u_BC.y
      );
      ctx.stroke();

      // Place the label (mark value) below side CA.
      // Since side CA is horizontal, "below" means increasing the y-coordinate.
      var labelPos = {
        x: center.x,
        y: center.y + labelTickGap_CA,
      };

      // Draw the label.
      ctx.font = "10px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(item.mark.toString(), labelPos.x, labelPos.y);
    });
  }

  // Function to clear only the visualization (point and lines)
  function clearVisualization() {
    if (window.visualizationData) {
      // Redraw the Duval Triangle (without the user-added point and lines)
      redrawDuvalTriangle();

      // Reset visualization data
      window.visualizationData = null;
      console.log("Visualization of point and lines cleared.");
    }
  }

  // Event listener for the No option which is one of the button appaer when user clicked view-Diagnostic Button
  document
    .getElementById("modalYes-viewDiagnostic-Modal")
    .addEventListener("click", function () {
      plotPointInsideDuvalTriangle();
    });
  // Event listener for the Yes option which is one of the button appaer when user clicked view-Diagnostic Button
  document
    .getElementById("modalNo-viewDiagnostic-Modal")
    .addEventListener("click", function () {
      // Remove the visualization of point and lines
      clearVisualization();
      plotPointInsideDuvalTriangle();
    });

  // Modify the Clear Button to Remove Visualization
  document
    .getElementById("modalYes-clear-duval")
    .addEventListener("click", function () {
      // Remove the visualization of point and lines
      clearVisualization();
    });
};

/****Button Section */
/*********************************************************************************** */
//Section-3:: Functionality of Submit Button or View Diagnostic Button in Duval Canvas Page
//Update of % column when btn-submit is clikced

document.addEventListener("DOMContentLoaded", function () {
  updateGasProportions(); // Run function on page load

  // Attach event listener to the Submit button
  let submitButton = document.getElementById("btn-submit");
  if (submitButton) {
    submitButton.addEventListener("click", function () {
      updateGasProportions(); // Update gas proportions when clicked
    });
  }
});

// Function to calculate and update gas proportions
function updateGasProportions() {
  // Retrieve values from localStorage or input fields
  let methane = parseFloat(document.getElementById("ppm-input-P1").value);
  let ethylene = parseFloat(document.getElementById("ppm-input-P2").value);
  let acetylene = parseFloat(document.getElementById("ppm-input-P3").value);

  // Calculate total PPM
  let totalPPM = methane + ethylene + acetylene;

  // Avoid division by zero and calculate proportions
  let methanePercent = totalPPM ? ((methane / totalPPM) * 100).toFixed(2) : "0";
  let ethylenePercent = totalPPM
    ? ((ethylene / totalPPM) * 100).toFixed(2)
    : "0";
  let acetylenePercent = totalPPM
    ? ((acetylene / totalPPM) * 100).toFixed(2)
    : "0";

  // Avoid division by zero and calculate proportions
  let P1 = totalPPM ? methane / totalPPM : 0;
  let P2 = totalPPM ? ethylene / totalPPM : 0;
  let P3 = totalPPM ? acetylene / totalPPM : 0;

  // Calculate coordinates
  let xCoordinate = (500 * (P2 + 0.5 * P1)).toFixed(2);
  let yCoordinate = (500 * 0.866 * P1).toFixed(2);

  // Update the corresponding div elements
  updateDivContent("cell-23", methanePercent);
  updateDivContent("cell-33", ethylenePercent);
  updateDivContent("cell-43", acetylenePercent);

  // Ensure merged cells get updated correctly
  let xCell = document.querySelector("#cell-24");
  let yCell = document.querySelector("#cell-25");

  if (xCell) {
    xCell.textContent = xCoordinate;
    xCell.style.textAlign = "center";
    xCell.style.fontWeight = "bold";
  }
  if (yCell) {
    yCell.textContent = yCoordinate;
    yCell.style.textAlign = "center";
    yCell.style.fontWeight = "bold";
  }
}

// Function to update the content and ensure center alignment
function updateDivContent(cellId, value) {
  let cell = document.getElementById(cellId);
  if (cell) {
    cell.textContent = value; // Update the text inside the div
    cell.style.textAlign = "center"; // Ensure text is centered
    cell.style.fontWeight = "bold"; // Optional: Make text bold for better visibility
  }
}

/*********************************************************************************** */
// Section-4::Clear Button Functionality (Updated)
// Show first modal when clicking "Clear" button
document.getElementById("btn-clear").addEventListener("click", function () {
  document.getElementById("clearModal-clear-duval").style.display = "flex";
});

// Close first modal when clicking "No"
document
  .getElementById("modalNo-clear-duval")
  .addEventListener("click", function () {
    document.getElementById("clearModal-clear-duval").style.display = "none";
  });

// "Yes" button on first modal: Clear data and show second modal
document
  .getElementById("modalYes-clear-duval")
  .addEventListener("click", function () {
    // Clear input fields
    document.getElementById("ppm-input-P1").value = "";
    document.getElementById("ppm-input-P2").value = "";
    document.getElementById("ppm-input-P3").value = "";
    document.getElementById("cell-23").innerText = "";
    document.getElementById("cell-33").innerText = "";
    document.getElementById("cell-43").innerText = "";
    document.getElementById("cell-24").innerText = "";
    document.getElementById("cell-34").innerText = "";
    document.getElementById("cell-44").innerText = "";
    document.getElementById("cell-25").innerText = "";
    document.getElementById("cell-35").innerText = "";
    document.getElementById("cell-45").innerText = "";

    // Clear diagnostic div contents for fault zone color and short description
    let faultColorDiv = document.querySelector(".zone-partfaultzonecolor");
    if (faultColorDiv) {
      faultColorDiv.innerText = "";
      faultColorDiv.style.backgroundColor = "";
    }
    let shortDescDiv = document.querySelector(".zone-part2faultzoneshortdesc");
    if (shortDescDiv) {
      shortDescDiv.innerText = "";
    }

    let longDescDiv = document.querySelector(".zone-part3faultzonelongdesc");
    if (longDescDiv) {
      longDescDiv.innerText = "";
    }

    console.log("Data cleared successfully.");

    // Close first modal
    document.getElementById("clearModal-clear-duval").style.display = "none";

    // Show success modal
    document.getElementById("clearModal-clear-Duval-Success").style.display =
      "flex";
  });

// Close second modal when clicking "No"
document
  .getElementById("modalNo-clear-Duval-Success")
  .addEventListener("click", function () {
    document.getElementById("clearModal-clear-Duval-Success").style.display =
      "none";
  });

// "Yes" button in the second modal: Navigate to "UserInputForm.html"
document
  .getElementById("modalYes-clear-Duval-Success")
  .addEventListener("click", function () {
    console.log("Navigating to UserInputForm.html...");
    window.location.href = "UserInputForm.html"; // Redirects to the new page
  });

//***************************************************************************************************** */
// Winding Number Algorithm for Zone identification
// =======================
// Updated Dataset for Zones (New Feature Only)
// =======================
const polygonGroups = [
  {
    PolygonName: "D1",
    ZoneNumber: 1,
    zoneColor: "rgb(104, 255, 255)",
    zoneShortDesc: "D1",
    zoneLongDesc: "Discharge of Low Energy",
    totalVertices: 4,
    initialVertex: {
      Order: 1,
      X: 0,
      Y: 0,
      FillColor: "rgb(104, 255, 255)",
      Vertex: "A",
      vertexNumber: 1,
    },
    finalVertex: {
      Order: 4,
      X: 217.5,
      Y: 376.71,
      FillColor: "rgb(104, 255, 255)",
      vertexNumber: 4,
    },
    vertices: [
      {
        Order: 1,
        X: 0,
        Y: 0,
        FillColor: "rgb(104, 255, 255)",
        Vertex: "A",
        ZoneNumber: 1,
        vertexNumber: 1,
      },
      {
        Order: 2,
        X: 115,
        Y: 0,
        FillColor: "rgb(104, 255, 255)",
        ZoneNumber: 1,
        vertexNumber: 2,
      },
      {
        Order: 3,
        X: 275,
        Y: 277.12,
        FillColor: "rgb(104, 255, 255)",
        ZoneNumber: 1,
        vertexNumber: 3,
      },
      {
        Order: 4,
        X: 217.5,
        Y: 376.71,
        FillColor: "rgb(104, 255, 255)",
        ZoneNumber: 1,
        vertexNumber: 4,
      },
    ],
  },
  {
    PolygonName: "D2",
    ZoneNumber: 2,
    zoneColor: "rgb(51, 100, 240)",
    zoneShortDesc: "D2",
    zoneLongDesc: "Discharge of Energy",
    totalVertices: 5,
    initialVertex: {
      Order: 5,
      X: 115,
      Y: 0,
      FillColor: "rgb(51, 100, 240)",
      vertexNumber: 1,
    },
    finalVertex: {
      Order: 9,
      X: 275,
      Y: 277.12,
      FillColor: "rgb(51, 100, 240)",
      vertexNumber: 5,
    },
    vertices: [
      {
        Order: 5,
        X: 115,
        Y: 0,
        FillColor: "rgb(51, 100, 240)",
        ZoneNumber: 2,
        vertexNumber: 1,
      },
      {
        Order: 6,
        X: 355,
        Y: 0,
        FillColor: "rgb(51, 100, 240)",
        Vertex: "C",
        ZoneNumber: 2,
        vertexNumber: 2,
      },
      {
        Order: 7,
        X: 277.5,
        Y: 134.23,
        FillColor: "rgb(51, 100, 240)",
        ZoneNumber: 2,
        vertexNumber: 3,
      },
      {
        Order: 8,
        X: 317.5,
        Y: 203.51,
        FillColor: "rgb(51, 100, 240)",
        ZoneNumber: 2,
        vertexNumber: 4,
      },
      {
        Order: 9,
        X: 275,
        Y: 277.12,
        FillColor: "rgb(51, 100, 240)",
        ZoneNumber: 2,
        vertexNumber: 5,
      },
    ],
  },
  {
    PolygonName: "DT",
    ZoneNumber: 3,
    zoneColor: "rgb(200,60,200)",
    zoneShortDesc: "DT",
    zoneLongDesc: "Electrical & Thermal Fault",
    totalVertices: 8,
    initialVertex: {
      Order: 10,
      X: 355,
      Y: 0,
      FillColor: "rgb(200,60,200)",
      vertexNumber: 1,
    },
    finalVertex: {
      Order: 17,
      X: 277.5,
      Y: 134.23,
      FillColor: "rgb(200,60,200)",
      vertexNumber: 8,
    },
    vertices: [
      {
        Order: 10,
        X: 355,
        Y: 0,
        FillColor: "rgb(200,60,200)",
        ZoneNumber: 3,
        vertexNumber: 1,
      },
      {
        Order: 11,
        X: 425,
        Y: 0,
        FillColor: "rgb(200,60,200)",
        ZoneNumber: 3,
        vertexNumber: 2,
      },
      {
        Order: 12,
        X: 337.5,
        Y: 151.55,
        FillColor: "rgb(200,60,200)",
        ZoneNumber: 3,
        vertexNumber: 3,
      },
      {
        Order: 13,
        X: 365,
        Y: 199.18,
        FillColor: "rgb(200,60,200)",
        ZoneNumber: 3,
        vertexNumber: 4,
      },
      {
        Order: 14,
        X: 240,
        Y: 415.68,
        FillColor: "rgb(200,60,200)",
        ZoneNumber: 3,
        vertexNumber: 5,
      },
      {
        Order: 15,
        X: 217.5,
        Y: 376.71,
        FillColor: "rgb(200,60,200)",
        ZoneNumber: 3,
        vertexNumber: 6,
      },
      {
        Order: 16,
        X: 317.5,
        Y: 203.51,
        FillColor: "rgb(200,60,200)",
        ZoneNumber: 3,
        vertexNumber: 7,
      },
      {
        Order: 17,
        X: 277.5,
        Y: 134.23,
        FillColor: "rgb(200,60,200)",
        ZoneNumber: 3,
        vertexNumber: 8,
      },
    ],
  },
  {
    PolygonName: "T1",
    ZoneNumber: 4,
    zoneColor: "rgb(255,153,153)",
    zoneShortDesc: "T1",
    zoneLongDesc: "Thermal Fault: T ≤ 300 °C",
    totalVertices: 5,
    initialVertex: {
      Order: 18,
      X: 290,
      Y: 329.08,
      FillColor: "rgb(255,153,153)",
      vertexNumber: 1,
    },
    finalVertex: {
      Order: 22,
      X: 240,
      Y: 415.68,
      FillColor: "rgb(255,153,153)",
      vertexNumber: 5,
    },
    vertices: [
      {
        Order: 18,
        X: 290,
        Y: 329.08,
        FillColor: "rgb(255,153,153)",
        ZoneNumber: 4,
        vertexNumber: 1,
      },
      {
        Order: 19,
        X: 300,
        Y: 346.4,
        FillColor: "rgb(255,153,153)",
        ZoneNumber: 4,
        vertexNumber: 2,
      },
      {
        Order: 20,
        X: 255,
        Y: 424.34,
        FillColor: "rgb(255,153,153)",
        ZoneNumber: 4,
        vertexNumber: 3,
      },
      {
        Order: 21,
        X: 245,
        Y: 424.34,
        FillColor: "rgb(255,153,153)",
        ZoneNumber: 4,
        vertexNumber: 4,
      },
      {
        Order: 22,
        X: 240,
        Y: 415.68,
        FillColor: "rgb(255,153,153)",
        ZoneNumber: 4,
        vertexNumber: 5,
      },
    ],
  },
  {
    PolygonName: "T2",
    ZoneNumber: 5,
    zoneColor: "rgb(255,204,0)",
    zoneShortDesc: "T2",
    zoneLongDesc: "Thermal Fault: 300 °C < T ≤ 700 °C",
    totalVertices: 4,
    initialVertex: {
      Order: 23,
      X: 365,
      Y: 199.18,
      FillColor: "rgb(255,204,0)",
      vertexNumber: 1,
    },
    finalVertex: {
      Order: 26,
      X: 290,
      Y: 329.08,
      FillColor: "rgb(255,204,0)",
      vertexNumber: 4,
    },
    vertices: [
      {
        Order: 23,
        X: 365,
        Y: 199.18,
        FillColor: "rgb(255,204,0)",
        ZoneNumber: 5,
        vertexNumber: 1,
      },
      {
        Order: 24,
        X: 375,
        Y: 216.5,
        FillColor: "rgb(255,204,0)",
        ZoneNumber: 5,
        vertexNumber: 2,
      },
      {
        Order: 25,
        X: 300,
        Y: 346.4,
        FillColor: "rgb(255,204,0)",
        ZoneNumber: 5,
        vertexNumber: 3,
      },
      {
        Order: 26,
        X: 290,
        Y: 329.08,
        FillColor: "rgb(255,204,0)",
        ZoneNumber: 5,
        vertexNumber: 4,
      },
    ],
  },
  {
    PolygonName: "T3",
    ZoneNumber: 6,
    zoneColor: "rgb(0,0,0)",
    zoneShortDesc: "T3",
    zoneLongDesc: "Thermal Fault: T ≥ 700 °C",
    totalVertices: 4,
    initialVertex: {
      Order: 27,
      X: 425,
      Y: 0,
      FillColor: "rgb(0,0,0)",
      vertexNumber: 1,
    },
    finalVertex: {
      Order: 30,
      X: 337.5,
      Y: 151.55,
      FillColor: "rgb(0,0,0)",
      vertexNumber: 4,
    },
    vertices: [
      {
        Order: 27,
        X: 425,
        Y: 0,
        FillColor: "rgb(0,0,0)",
        ZoneNumber: 6,
        vertexNumber: 1,
      },
      {
        Order: 28,
        X: 500,
        Y: 0,
        FillColor: "rgb(0,0,0)",
        Vertex: "C",
        ZoneNumber: 6,
        vertexNumber: 2,
      },
      {
        Order: 29,
        X: 375,
        Y: 216.5,
        FillColor: "rgb(0,0,0)",
        ZoneNumber: 6,
        vertexNumber: 3,
      },
      {
        Order: 30,
        X: 337.5,
        Y: 151.55,
        FillColor: "rgb(0,0,0)",
        ZoneNumber: 6,
        vertexNumber: 4,
      },
    ],
  },
  {
    PolygonName: "PD",
    ZoneNumber: 7,
    zoneColor: "rgb(255,0,0)",
    zoneShortDesc: "PD",
    zoneLongDesc: "Partial Discharge",
    totalVertices: 3,
    initialVertex: {
      Order: 31,
      X: 255,
      Y: 424.34,
      FillColor: "rgb(255,0,0)",
      vertexNumber: 1,
    },
    finalVertex: {
      Order: 33,
      X: 245,
      Y: 424.34,
      FillColor: "rgb(255,0,0)",
      vertexNumber: 3,
    },
    vertices: [
      {
        Order: 31,
        X: 255,
        Y: 424.34,
        FillColor: "rgb(255,0,0)",
        ZoneNumber: 7,
        vertexNumber: 1,
      },
      {
        Order: 32,
        X: 250,
        Y: 433,
        FillColor: "rgb(255,0,0)",
        Vertex: "B",
        ZoneNumber: 7,
        vertexNumber: 2,
      },
      {
        Order: 33,
        X: 245,
        Y: 424.34,
        FillColor: "rgb(255,0,0)",
        ZoneNumber: 7,
        vertexNumber: 3,
      },
    ],
  },
];

// =======================
// Standard Winding Number Algorithm Implementation
// =======================
function computeWindingNumber(vertices, P) {
  console.log(vertices);
  let wn = 0;
  const n = vertices.length;

  for (let i = 0; i < n; i++) {
    // Shift vertex coordinates: V_i' = (V_i − P)
    let x_i = vertices[i].X - P.x;
    let y_i = vertices[i].Y - P.y;
    let nextIndex = (i + 1) % n;
    let x_ip1 = vertices[nextIndex].X - P.x;
    let y_ip1 = vertices[nextIndex].Y - P.y;
    console.log("Initial Vertex", x_i, y_i);
    console.log("Final Vertex", x_ip1, y_ip1);
    console.log("Product", y_i * y_ip1);
    // --- Case 1: y_i * y_ip1 < 0 ---
    if (y_i * y_ip1 < 0) {
      let R = x_i + (y_i * (x_ip1 - x_i)) / (y_i - y_ip1);
      console.log(R);
      if (R > 0) {
        if (y_i < 0) {
          wn = wn + 1;
          console.log(wn);
        } else {
          wn = wn - 1;
          console.log(wn);
        }
      } else {
        if (y_i > 0) {
          wn = wn + 1;
          console.log(wn);
        } else {
          wn = wn - 1;
          console.log(wn);
        }
      }
    }
    // --- Case 2: y_i * y_ip1 == 0 ---
    else if (y_i * y_ip1 === 0) {
      if (y_i === 0) {
        if (x_i > 0) {
          if (y_ip1 > 0) {
            wn = wn + 0.5;
            console.log(wn);
          } else {
            wn = wn - 0.5;
            console.log(wn);
          }
        } else {
          // x_i <= 0
          if (y_ip1 < 0) {
            wn = wn + 0.5;
            console.log(wn);
          } else {
            wn = wn - 0.5;
            console.log(wn);
          }
        }
      } else {
        // y_i !== 0, so then y_ip1 must be 0.
        if (x_ip1 > 0) {
          if (y_i < 0) {
            wn = wn + 0.5;
            console.log(wn);
          } else {
            wn = wn - 0.5;
            console.log(wn);
          }
        } else {
          if (y_i > 0) {
            wn = wn + 0.5;
            console.log(wn);
          } else {
            wn = wn - 0.5;
            console.log(wn);
          }
        }
      }
    }
    // --- Case 3: y_i * y_ip1 > 0 ---
    else {
      // Do nothing; wn remains unchanged.
      console.log(wn);
    }
  }

  return wn;
}

function isLeft(v1, v2, P) {
  // Returns >0 if point P is left of the line through v1 and v2.
  return (v2.X - v1.X) * (P.y - v1.Y) - (P.x - v1.X) * (v2.Y - v1.Y);
}

// =======================
// Determine Zone for Point & Update Diagnostic UI
// =======================
function determineZoneForPoint(P) {
  // Sort zones by ZoneNumber
  const sortedZones = polygonGroups
    .slice()
    .sort((a, b) => a.ZoneNumber - b.ZoneNumber);
  for (let zone of sortedZones) {
    const wn = computeWindingNumber(zone.vertices, P);
    // If winding number is nonzero, the point is inside this zone.
    if (wn !== 0) {
      const faultColorDiv = document.querySelector(".zone-partfaultzonecolor");
      const shortDescDiv = document.querySelector(
        ".zone-part2faultzoneshortdesc"
      );
      const longDescDiv = document.querySelector(
        ".zone-part3faultzonelongdesc"
      );
      if (faultColorDiv) faultColorDiv.style.backgroundColor = zone.zoneColor;
      if (shortDescDiv) shortDescDiv.textContent = zone.zoneShortDesc;
      if (longDescDiv) longDescDiv.textContent = zone.zoneLongDesc;
      console.log(
        "Point lies in zone:",
        zone.PolygonName,
        "with winding number:",
        wn
      );
      return;
    }
  }
  // If no zone contains the point, update UI accordingly.
  const faultColorDiv = document.querySelector(".zone-partfaultzonecolor");
  const shortDescDiv = document.querySelector(".zone-part2faultzoneshortdesc");
  const longDescDiv = document.querySelector(".zone-part3faultzonelongdesc");
  if (faultColorDiv) faultColorDiv.style.backgroundColor = "";
  if (shortDescDiv) shortDescDiv.textContent = "None";
  if (longDescDiv)
    longDescDiv.textContent = "Point lies outside Duval Triangle";
  console.log("Point lies outside all zones.");
}

// =======================
// Submit Button Integration for the New Feature
// =======================
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("btn-submit");
  if (submitButton) {
    submitButton.addEventListener("click", function () {
      // Retrieve gas input values and compute logical coordinates.
      const methane =
        parseFloat(document.getElementById("ppm-input-P1").value) || 0;
      const ethylene =
        parseFloat(document.getElementById("ppm-input-P2").value) || 0;
      const acetylene =
        parseFloat(document.getElementById("ppm-input-P3").value) || 0;
      const totalPPM = methane + ethylene + acetylene;
      if (totalPPM === 0) return;
      const P1 = methane / totalPPM;
      const P2 = ethylene / totalPPM;
      // Using the existing formula:
      const a = 500 * (P2 + 0.5 * P1);
      const b = 500 * 0.866 * P1;
      const logicalPoint = { x: a, y: b };

      // Determine the zone and update diagnostic UI.
      determineZoneForPoint(logicalPoint);
    });
  }
});

/************************************************************************** */
//JS code for appearnace of Modal when view Diagnostic is click
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("submitModal-viewDiagnostic-Modal");
  const btnSubmit = document.getElementById("btn-submit");
  const btnYes = document.getElementById("modalYes-viewDiagnostic-Modal");
  const btnNo = document.getElementById("modalNo-viewDiagnostic-Modal");

  // Open modal when btn-submit is clicked
  btnSubmit.addEventListener("click", function () {
    modal.style.display = "flex"; // Show modal
  });

  // Placeholder for Yes and No actions (to be defined later)
  btnYes.addEventListener("click", function () {
    modal.style.display = "none"; // Hide modal
    console.log("Yes clicked - Action to be implemented later");
  });

  btnNo.addEventListener("click", function () {
    modal.style.display = "none"; // Hide modal
    console.log("No clicked - Action to be implemented later");
  });

  // Close modal when clicking outside the content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none"; // Hide modal when clicking outside
    }
  });
});

//***** Add New Entry Button Functionality .Clicking on Add New Entry button shall navigate to User input Form */

document
  .getElementById("btn-add-new-entry")
  .addEventListener("click", function () {
    console.log(
      "Navigating to UserInputForm.html... on clicking Add New Entry Button"
    );
    window.location.href = "UserInputForm.html"; // Redirects to the new page
  });
