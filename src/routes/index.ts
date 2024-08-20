import LeadRoute from "./lead.routes";
import { app } from "../server";

export const loadRoutes = () => {
  app.use("/api/v1/lead", LeadRoute);
};
