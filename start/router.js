
const companyRoute = require('../routes/companyRoutes');
const userRoute = require('../routes/userRoutes');
const jobRoutes = require('../routes/jobRoutes');
const authRoutes = require('../routes/authRoutes');
const applicationRoutes = require('../routes/applicationRoutes');


module.exports = app => {
    app.use('/api/company', companyRoute);
    app.use('/api/user', userRoute);
    app.use('/api/job', jobRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/application', applicationRoutes);
}