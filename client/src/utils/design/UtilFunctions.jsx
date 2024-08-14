import {
  DRAG_FUNCTION,
  MOVE_FUNCTION,
  MOVE_TAP_FUNCTION,
  TAP_FUNCTION,
  TIMEOUT_FUNCTION,
} from './Constants';

// Drag
export const createDragDataPoint = (
  offsetX,
  offsetY,
  dataGroup,
  dataPointMarkerRef,
  speedOfArmMoving,
  speedOfFingerMoving,
  numberOfFingerTapping,
  drawPlotPoint,
  DragFunctionColour,
  setIsCreatingDragDataPoint,
  setTempDragObject
) => {
  let newDataPoint = {
    dataGroup: dataGroup,
    dataType: DRAG_FUNCTION, // Tap, Move, MoveTap, Drag, Timeout
    startxPos: offsetX,
    startyPos: offsetY,
    finishxPos: null,
    finishyPos: null,
    xySpeed: speedOfArmMoving,
    zSpeed: speedOfFingerMoving,
    numFingers: numberOfFingerTapping,
    timeLength: 0,
  };

  // Directly increment and use dataPointMarkerRef for new data points
  dataPointMarkerRef.current += 1;

  drawPlotPoint(newDataPoint, DragFunctionColour, dataPointMarkerRef.current);

  setIsCreatingDragDataPoint(true);
  setTempDragObject(newDataPoint);
};

// Drag

export const setSecondDragPoint = (
  offsetX,
  offsetY,
  tempDragObject,
  setTempDragObject,
  drawPlotPoint,
  DragFunctionColour,
  dataPointMarkerRef,
  updateLoopState,
  setIsCreatingDragDataPoint
) => {
  let completedObject = {
    ...tempDragObject,
    finishxPos: offsetX,
    finishyPos: offsetY,
  };
  // Update the tempDragObject with the new finish positions
  setTempDragObject((currentDragObject) => ({
    ...currentDragObject,
    finishxPos: offsetX,
    finishyPos: offsetY,
  }));

  drawPlotPoint(
    completedObject,
    DragFunctionColour,
    dataPointMarkerRef.current
  );

  updateLoopState(completedObject);
  setIsCreatingDragDataPoint(false);
};

// Tap
export const createTapDataPoint = (
  offsetX,
  offsetY,
  dataGroup,
  speedOfFingerMoving,
  numberOfFingerTapping,
  dataPointMarkerRef,
  updateLoopState,
  drawPlotPoint,
  TapFunctionColour
) => {
  let newDataPoint = {
    dataGroup: dataGroup,
    dataType: TAP_FUNCTION, // Tap, Move, MoveTap, Drag, Timeout
    xPos: offsetX,
    yPos: offsetY,
    zSpeed: speedOfFingerMoving,
    numFingers: numberOfFingerTapping,
    timeLength: 0,
  };

  // Directly increment and use dataPointMarkerRef for new data points
  dataPointMarkerRef.current += 1;

  updateLoopState(newDataPoint);
  drawPlotPoint(newDataPoint, TapFunctionColour, dataPointMarkerRef.current);
};

// Move
export const createMoveDataPoint = (
  offsetX,
  offsetY,
  dataGroup,
  speedOfArmMoving,
  dataPointMarkerRef,
  updateLoopState,
  drawPlotPoint,
  MoveFunctionColour
) => {
  let newDataPoint = {
    dataGroup: dataGroup,
    dataType: MOVE_FUNCTION, // Tap, Move, MoveTap, Drag, Timeout
    xPos: offsetX,
    yPos: offsetY,
    xySpeed: speedOfArmMoving,
    timeLength: 0,
  };

  // Directly increment and use dataPointMarkerRef for new data points
  dataPointMarkerRef.current += 1;

  updateLoopState(newDataPoint);
  drawPlotPoint(newDataPoint, MoveFunctionColour, dataPointMarkerRef.current);
};

// Move And Tap
export const createMoveAndTapDataPoint = (
  offsetX,
  offsetY,
  dataGroup,
  speedOfArmMoving,
  speedOfFingerMoving,
  numberOfFingerTapping,
  dataPointMarkerRef,
  updateLoopState,
  drawPlotPoint,
  MoveTapFunctionColour
) => {
  let newDataPoint = {
    dataGroup: dataGroup,
    dataType: MOVE_TAP_FUNCTION, // Tap, Move, MoveTap, Drag, Timeout
    xPos: offsetX,
    yPos: offsetY,
    xySpeed: speedOfArmMoving,
    zSpeed: speedOfFingerMoving,
    numFingers: numberOfFingerTapping,
    timeLength: 0,
  };

  // Directly increment and use dataPointMarkerRef for new data points
  dataPointMarkerRef.current += 1;

  updateLoopState(newDataPoint);
  drawPlotPoint(
    newDataPoint,
    MoveTapFunctionColour,
    dataPointMarkerRef.current
  );
};

// Timeout
export const createTimeoutDataPoint = (
  offsetX,
  offsetY,
  dataGroup,
  timeoutLength,
  dataPointMarkerRef,
  updateLoopState,
  drawPlotPoint,
  TimeoutFunctionColour
) => {
  let newDataPoint = {
    dataGroup: dataGroup,
    dataType: TIMEOUT_FUNCTION, // Tap, Move, MoveTap, Drag, Timeout
    xPos: offsetX,
    yPos: offsetY,
    timeoutLength: timeoutLength, // milliseconds only
  };

  // Directly increment and use dataPointMarkerRef for new data points

  dataPointMarkerRef.current += 1;
  updateLoopState(newDataPoint);
  drawPlotPoint(
    newDataPoint,
    TimeoutFunctionColour,
    dataPointMarkerRef.current
  );
};
