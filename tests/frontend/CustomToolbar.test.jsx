import renderer from "react-test-renderer";
import CustomToolbar from "../../resources/js/components/CustomToolbar";

test("rendering CustomToolbar component", function () {
    const component = renderer.create(<CustomToolbar />).toJSON();

    expect(component).toMatchSnapshot();
});
