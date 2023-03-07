import renderer from "react-test-renderer";
import Notfound from "../../resources/js/components/Notfound";

test("rendering CustomToolbar component", function () {
    const component = renderer.create(<Notfound />).toJSON();

    expect(component).toMatchSnapshot();
});
