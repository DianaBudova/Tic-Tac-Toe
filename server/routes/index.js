import mainRoutes from "./main.js";
import userRoutes from "./user.js";

export default function (app) {
    mainRoutes(app);
    userRoutes(app);
}
