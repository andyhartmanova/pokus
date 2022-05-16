//@@viewOn:imports
import { createVisualComponent, Utils, Content, Lsi, useDataList, useState, useMemo } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Tiles from "uu5tilesg02";
import RouteBar from "../core/route-bar.js";
import RouteContainer from "../core/route-container.js";
import Config from "./config/config.js";
import LSI from "../config/lsi.js";
import Calls from "../calls.js";
import SensorCreateUpdateFormModal from "../core/sensor-create-update-form-modal.js";
//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TestRoute = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TestRoute",
  nestingLevel: ["bigBoxCollection", "bigBox"],

  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [selectedSensor, setSelectedSensor] = useState(null);

    const sensorData = useDataList({
        itemIdentifier: "code",
        handlerMap: {
            load: Calls.sensorList,
            createItem: Calls.sensorCreate,
            updateItem: Calls.sensorUpdate,
        },
        initialDtoIn: {},
      });
      const locationsData = useDataList({
        handlerMap: {
            load: Calls.locationList
            
        },
        initialDtoIn: {},
      });
    //@@viewOff:private

    //@@viewOn:interface
    function handleCreateSensor(newSensorData) {
        return sensorData.handlerMap.createItem(newSensorData);
      }
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, TestRoute);

    return currentNestingLevel ? (
      <div {...attrs}>
          {selectedSensor && (
          <SensorCreateUpdateFormModal
            selectedSensor={selectedSensor.data}
            locations = {locationsData.data}

            setSelectedSensor={setSelectedSensor}
            handleCreateSensor={handleCreateSensor}
            handleUpdateSensor={[]}
          />
        )}
        <RouteBar />
        <Uu5Elements.Block
              headerType="title"
              level={1}
              actionList={[
                {
                  icon: "mdi-plus",
                  children: <Lsi lsi={LSI.sensorManagement.createSensor} />,
                  primary: true,
                  onClick: () => setSelectedSensor({ data: {} }),
                },
              ]}
            ></Uu5Elements.Block>
        <Content nestingLevel={currentNestingLevel}>
          <RouteContainer>
            <Uu5Elements.Block headerType="title" level={1} header={<Lsi lsi={LSI.menu.testRoute} />}>

             
            </Uu5Elements.Block>
          </RouteContainer>
        </Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TestRoute };
export default TestRoute;
//@@viewOff:exports
