import mainRoutes from "./main.js";
import userRoutes from "./user.js";
import statisticRoutes from "./statistic.js";

export default function (app) {
    mainRoutes(app);
    userRoutes(app);
    statisticRoutes(app);
}
