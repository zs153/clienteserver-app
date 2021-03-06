import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
// import rutas
import mainRouter from "./routes/main.router";
import adminRouter from "./routes/admin.router";
import loginRouter from "./routes/login.router";
import usuarioRouter from "./routes/usuario.router";
import oficinaRouter from "./routes/oficina.router";
import formularioRouter from "./routes/formulario.router";
import fraudeRouter from "./routes/fraude.router";
import citaRouter from "./routes/citas.router";
import smsRouter from "./routes/sms.router";
import tipoFormularioRouter from "./routes/tipoformulario.router";
import tipoEventoRouter from "./routes/tipoevento.router";
import tipoFraudeRouter from "./routes/tipofraude.router";
import tipoHitoRouter from "./routes/tipohito.router";
import subtipoRouter from "./routes/subtipo.router";
import estadisticaRouter from "./routes/estadisticas.router";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use("/", mainRouter);
app.use("/admin", adminRouter);
app.use("/admin", usuarioRouter);
app.use("/admin", oficinaRouter);
app.use("/admin", formularioRouter);
app.use("/admin", fraudeRouter);
app.use("/admin", citaRouter);
app.use("/admin", smsRouter);
app.use("/admin", tipoFormularioRouter);
app.use("/admin", tipoEventoRouter);
app.use("/admin", tipoFraudeRouter);
app.use("/admin", tipoHitoRouter);
app.use("/admin", subtipoRouter);
app.use("/admin", estadisticaRouter);
app.use("/log", loginRouter);

export default app;
