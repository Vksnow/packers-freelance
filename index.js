import express from "express";
import helmet from 'helmet';
import cors from 'cors'
import morgan from 'morgan';
import { ErrorHandling } from "./utils/errorHandling.js";
import CompanyRoutes from './routes/companyRoutes.js'
import CustomerRoutes from './routes/customerRoutes.js'
import AuthRoutes from './routes/authRoutes.js'
import { Authorization, AuthorizationRole, decodeToken } from "./utils/authorization.js";
import quotationRoutes from './routes/quotationRoutes.js'
import lrRoutes from './routes/lrRoutes.js'
import receiptRoutes from './routes/receiptRoutes.js'
import SurveyRoutes from './routes/surveyRoutes.js'
import PackingRoutes from './routes/packingRoutes.js'
import NocRoutes from './routes/nocRoutes.js'
import PdfRoutes from './routes/pdfRoutes.js'
const app = express()
// const allowedOrigins = [""]
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     // methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
//     credentials: true
// }));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
  crossOriginResourcePolicy:{policy:"cross-origin"}
}));

app.use("/uploads", express.static("uploads/company"));


app.use('/api/auth',AuthRoutes)
app.use('/app-me',decodeToken)

app.use('/api/company',Authorization,AuthorizationRole('admin'),CompanyRoutes)
app.use('/api/customer',Authorization,AuthorizationRole('admin'),CustomerRoutes)


// admin 
app.use('/api/quotation',Authorization,AuthorizationRole('admin'),quotationRoutes)
app.use('/api/lrbill',Authorization,AuthorizationRole('admin'),lrRoutes)
app.use('/api/receipt',Authorization,AuthorizationRole('admin'),receiptRoutes)
app.use('/api/survey',Authorization,AuthorizationRole('admin'),SurveyRoutes)
app.use('/api/packing',Authorization,AuthorizationRole('admin'),PackingRoutes)
app.use('/api/noc',Authorization,AuthorizationRole('admin'),NocRoutes)

app.use('/api/pdf',Authorization,AuthorizationRole('admin'),PdfRoutes)

app.use(ErrorHandling)

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});


export default app