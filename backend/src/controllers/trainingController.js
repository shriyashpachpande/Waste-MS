// const TrainingModule = require('../models/TrainingModule');
// const Certificate = require('../models/Certificate');
// const User = require('../models/User');
// const { sendMail } = require('../services/mailer');

// exports.listModules = async (req, res) => {
//   res.json(await TrainingModule.find());
// };

// exports.getModule = async (req, res) => {
//   const module = await TrainingModule.findById(req.params.id);
//   if (!module) return res.status(404).json({ message: 'Not found' });
//   res.json(module);
// };

// exports.createModule = async (req, res) => {
//   const module = await TrainingModule.create({ ...req.body, createdBy: req.user._id });
//   res.json(module);
// };

// exports.submitQuiz = async (req, res) => {
//   const { answers } = req.body;
//   const module = await TrainingModule.findById(req.params.id);
//   if (!module) return res.status(404).json({ message: 'Not found' });
//   let score = 0;
//   module.mcqs.forEach((q, idx) => {
//     if (answers[idx] === q.correct) score++;
//   });
//   const pass = score >= module.passingScore;
//   if (pass) {
//     const cert = await Certificate.create({
//       userId: req.user._id,
//       trainingId: module._id,
//       score,
//       certificateUrl: `/certificates/${req.user._id}_${module._id}.pdf` // Assume generator
//     });
//     req.user.points += 20; // Reward for passing
//     await req.user.save();
//     sendMail({ to: req.user.email, subject: 'Training Completed', html: 'Congrats! You passed.' });
//     return res.json({ score, pass, certificate: cert });
//   }
//   res.json({ score, pass });
// };

// exports.getCertificate = async (req, res) => {
//   const cert = await Certificate.findOne({ userId: req.user._id, trainingId: req.params.id });
//   if (!cert) return res.status(404).json({ message: 'Not found' });
//   // For now, just send URL, later pdf download
//   res.json(cert);
// };













const TrainingModule = require('../models/TrainingModule');
const Certificate = require('../models/Certificate');
const User = require('../models/User');
const { sendMail } = require('../services/mailer');

// PDF CERTIFICATE DEPENDENCIES
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// -------------------------------
// LIST ALL TRAINING MODULES
// -------------------------------
exports.listModules = async (req, res) => {
  const modules = await TrainingModule.find();
  res.json(modules);
};

// -------------------------------
// GET SINGLE TRAINING MODULE
// -------------------------------
exports.getModule = async (req, res) => {
  const module = await TrainingModule.findById(req.params.id);
  if (!module) return res.status(404).json({ message: 'Not found' });
  res.json(module);
};

// -------------------------------
// ADMIN: CREATE TRAINING MODULE
// -------------------------------
exports.createModule = async (req, res) => {
  const module = await TrainingModule.create({
    ...req.body,
    createdBy: req.user._id
  });

  res.json(module);
};

// -------------------------------
// SUBMIT QUIZ + GENERATE PDF CERTIFICATE
// -------------------------------
// exports.submitQuiz = async (req, res) => {
//   const { answers } = req.body;

//   const module = await TrainingModule.findById(req.params.id);
//   if (!module) return res.status(404).json({ message: 'Not found' });

//   let score = 0;

//   module.mcqs.forEach((q, idx) => {
//     if (answers[idx] === q.correct) {
//       score++;
//     }
//   });

//   const pass = score >= module.passingScore;

//   // ----------------------------------
//   // IF PASS → GENERATE PDF CERTIFICATE
//   // ----------------------------------
//   if (pass) {

//     // Create filename & path
//     const fileName = `${req.user._id}_${module._id}.pdf`;
//     const filePath = path.join("certificates", fileName);

//     // Create "certificates" folder if not exists
//     if (!fs.existsSync("certificates")) {
//       fs.mkdirSync("certificates");
//     }

//     // Generate PDF
//     const doc = new PDFDocument();
//     const stream = fs.createWriteStream(filePath);
//     doc.pipe(stream);

//     doc.fontSize(26).text("Certificate of Completion", { align: "center" });
//     doc.moveDown();

//     doc.fontSize(14).text("This certifies that", { align: "center" });
//     doc.fontSize(20).text(req.user.name, { align: "center" });

//     doc.moveDown();
//     doc.fontSize(14).text("has successfully completed", { align: "center" });
//     doc.fontSize(18).text(module.title, { align: "center" });

//     doc.moveDown();
//     doc.fontSize(16).text(`Score: ${score}`, { align: "center" });

//     doc.end();

//     // Save certificate in DB
//     const cert = await Certificate.create({
//       userId: req.user._id,
//       trainingId: module._id,
//       score,
//       certificateUrl: `/certificates/${fileName}`
//     });

//     // Reward points
//     req.user.points += 20;
//     await req.user.save();

//     // Send mail
//     sendMail({
//       to: req.user.email,
//       subject: "Training Completed",
//       html: "Congrats! You passed."
//     });

//     return res.json({ score, pass, certificate: cert });
//   }

//   // If failed
//   res.json({ score, pass });
// };



exports.submitQuiz = async (req, res) => {
    const { answers } = req.body;
    const module = await TrainingModule.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Not found" });

    let score = 0;
    module.mcqs.forEach((q, idx) => {
        if (answers[idx] === q.correct) score++;
    });

    const pass = score >= module.passingScore;

    if (pass) {
        const fileName = `${req.user._id}_${module._id}.pdf`;

        // FULL ABSOLUTE PATH
        const folderPath = path.join(__dirname, "..", "certificates");
        const filePath = path.join(folderPath, fileName);

        console.log("📁 Certificates Folder:", folderPath);
        console.log("📄 PDF Path:", filePath);

        // Create folder if not exist
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log("📁 Created certificates folder");
        }

        // Generate PDF
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(26).text("Certificate of Completion", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text("This certifies that", { align: "center" });
        doc.fontSize(20).text(req.user.name, { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text("has successfully completed", { align: "center" });
        doc.fontSize(18).text(module.title, { align: "center" });
        doc.moveDown();
        doc.fontSize(16).text(`Score: ${score}`, { align: "center" });

        doc.end();

        stream.on("finish", () => {
            console.log("✅ PDF successfully generated!");
        });

        const cert = await Certificate.create({
            userId: req.user._id,
            trainingId: module._id,
            score,
            certificateUrl: `/certificates/${fileName}`
        });

        req.user.points += 20;
        await req.user.save();

        sendMail({
            to: req.user.email,
            subject: "Training Completed",
            html: "Congrats! You passed."
        });

        return res.json({ score, pass, certificate: cert });
    }

    res.json({ score, pass });
};





// -------------------------------
// GET USER CERTIFICATE FOR MODULE
// -------------------------------
exports.getCertificate = async (req, res) => {
  const cert = await Certificate.findOne({
    userId: req.user._id,
    trainingId: req.params.id
  });

  if (!cert) return res.status(404).json({ message: 'Not found' });

  res.json(cert);
};
