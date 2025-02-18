const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const crypto = require('crypto');
const sha1 = require('sha1');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const nodemailer = require('nodemailer');

const db = require('../connection/config/database');

console.log(db, 'db')

const transporter = nodemailer.createTransport({
  host: 'mail.urbanitsolution.com',
  port: 587,
  secure: false,
  auth: {
    user: 'saklain@urbanitsolution.com',
    pass: 'saklain',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post('/send-otp/email', async (req, res) => {
  try {
    const { email, msg, otp } = req.body;
    // const otp = generateRandomOTP();

    const saveOtpQuery = 'UPDATE users SET email_verifiy_code = ? WHERE email = ?';
    await db.query(saveOtpQuery, [otp, email]);


    const mailOptions = {
      from: `saklain@urbanitsolution.com`,
      to: email,
      subject: 'OTP Verification',
      text: msg || `Your OTP is ${otp}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to send OTP via email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


function generateRandomOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


const puppeteer = require('puppeteer');
app.post('/convertToPDF', async (req, res) => {
  const { url } = req.body;

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
    });

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Generate a PDF buffer
    const pdfBuffer = await page.pdf();

    // Close the browser
    await browser.close();

    // Set the content type and send the PDF buffer as the response
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error converting to PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// http://192.168.0.107:5002/allUsers?email=abutaher01725@gmail.com
const usersModel = require('../app/model/Admin/usersListModel')
app.get('/user/allUser', usersModel.users_list)
app.get('/user/allUser/:id', usersModel.users_single)
app.get('/users', usersModel.users_controller)
app.get('/users/add', usersModel.addColumn)
app.get('/users/role_all', usersModel.role_list)
app.post('/send-otp', usersModel.send_users_number_otp)
// app.post('/send-otp/email', usersModel.emailOtpSend)
app.delete('/allUser/:id', usersModel.users_delete)
app.post('/updateUsers/:id', usersModel.users_edit)
app.put('/update/verification_code/:id', usersModel.UpdateSingleUserMobileVerificationCode)
app.put('/update/verification_code_email/:id', usersModel.UpdateSingleUserEmailVerificationCode)
app.get('/allUsers', usersModel.users_list_email_wise)
app.post('/login', usersModel.users_login);
app.post('/create-users', usersModel.users_create);
app.post('/admin/create_side_menu', usersModel.side_menu_create);
app.put('/admin/update_side_menu/:id', usersModel.side_menu_update);
app.put('/admin/reset_password/:id', usersModel.password_reset);
app.put('/updateLogin/:email', usersModel.updateLogin);



app.get('/menu_item/all', usersModel.menu_Item_list)
app.post('/menu_item/create', usersModel.menu_Item_create)
app.get('/admin_template_table/create', usersModel.admin_template_menu_table_create)
app.delete('/admin_template_table/delete/:id', usersModel.admin_template_menu_delete)
app.put('/admin_template_table/update/:id', usersModel.admin_template_menu_update)
app.delete('/admin_template_table/delete_all', usersModel.menu_item_delete_all)
app.post('/admin_template_table/post_all_data', usersModel.menu_item_create_bulk)
app.get('/page-group/display-name', usersModel.page_group_display_name_list);


// role

app.post('/user/user-role-create', usersModel.users_role_create);
app.get('/user/user-role-single/:id', usersModel.users_role_single);
app.put('/user/user-role/edit/:id', usersModel.users_role_update);
app.delete('/user/user-role/delete/:id', usersModel.users_role_delete);
app.get('/user/role', usersModel.users_role_permission_list);
app.get('/user-role/btn', usersModel.usersRoleBtn);


const adminPageList = require('../app/model/Admin/module_info/adminPageListModel')
app.get('/admin/allAdmin', adminPageList.getAllAdminPageList)

app.get('/admin/admin_panel_settings', adminPageList.admin_panel_settings_list)
app.get('/admin/admin_panel_settings/:id', adminPageList.admin_panel_settings_single)
app.get('/download/:columnName', adminPageList.getSingleAdminPanelSettingsDownload)
app.delete('/admin/admin_panel_settings/delete/:id', adminPageList.admin_panel_settings_delete)

app.get('/admin/module_info/module_info_all/:id/role', adminPageList.module_info_list_list)




app.get('/admin/allAdmin/:id', adminPageList.module_info_single)
app.delete('/admin/allAdmin/:id', adminPageList.module_info_delete)
app.post('/admin/delete/:id', adminPageList.module_info_delete)


const ModuleInfo = require('../app/model/Admin/module_info/moduleInfo')
app.post('/admin/allAdmin/', ModuleInfo.module_info_create)
app.post('/admin/copy/', ModuleInfo.module_info_copy)
app.post('/updateAdminList/:id', ModuleInfo.module_info_update)
app.delete('/admin/allAdmin/:id', ModuleInfo.module_info_delete)
app.get("/Pagination/:pageNo/:perPage", ModuleInfo.module_info_list_paigination);
app.post('/admin/module_info/delete/:id', ModuleInfo.module_info_delete)


// no need
app.get('/page-group/display-name/with-id', adminPageList.getPageGroupAndDisplayNameWithId)
app.get('/admin/allAdmin/', ModuleInfo.getAllAdminPageList)
app.get('/admin/module_info/module_info_all/:id', ModuleInfo.getAllAdminPageLists)
app.get('/admin/group-names-id', ModuleInfo.getPageGroupAndControllerNamesId)
app.get('/admin/users_role/users_role_permission/:id', ModuleInfo.users_role_permission_default_page)

const excelSheet = require('../app/model/Admin/excelSheet')

app.post('/createExcelSheet/', excelSheet.createExcelSheet)
app.put('/updateExcelSheet/:id', excelSheet.updateExcelSheet)
app.get('/getExcelSheet/', excelSheet.getExcelSheet)



const faIcons = require('../app/model/Admin/faIconsModel')
app.get('/faIcons', faIcons.getAllIconList)


const smsSettings = require('../app/model/Admin/smsSettings')
app.post('/smsSettings', smsSettings.updateSmsSettings)
app.get('/smsSettings/', smsSettings.getSmsSettings)


const brandModel = require('../app/model/Admin/brand_model/brand_model')

app.get('/Admin/brand/brand_all/:pageNo/:perPage', brandModel.brand_list_paigination)
app.get('/Admin/brand/brand_all', brandModel.brand_list)
app.post('/Admin/brand/brand_create', brandModel.brand_create)
app.post('/admin/brand/brand_delete/:id', brandModel.brand_delete)
app.get('/admin/brand/brand_all/:id', brandModel.brand_single)
app.post('/admin/brand/brand_edit/:id', brandModel.brand_update)
app.post('/Admin/brand/brand_search', brandModel.brand_search)
app.post('/Admin/brand/brand_copy', brandModel.brand_copy)
app.post('/Admin/brand/brand_pdf', brandModel.brand_pdf)



const categoryModel = require('../app/model/Admin/category_model/category_model')
app.post('/Admin/category/category_create', categoryModel.category_create)
app.get('/Admin/category/category_all', categoryModel.category_list)
app.get('/Admin/category/category_all/:id', categoryModel.category_single)
app.post('/Admin/category/category_edit/:id', categoryModel.category_update)
app.post('/Admin/category/category_delete/:id', categoryModel.category_delete)
app.get('/Admin/category/category_all/:pageNo/:perPage', categoryModel.category_list_paigination)
app.post('/Admin/category/category_search', categoryModel.category_search)
app.post('/Admin/category/category_copy', categoryModel.category_copy)
app.post('/Admin/category/category_pdf', categoryModel.category_pdf)

const colorModel = require('../app/model/Admin/color_model/color_model')
app.post('/Admin/color/color_create', colorModel.color_create)
app.get('/Admin/color/color_all', colorModel.color_list)
app.get('/Admin/color/color_all/:id', colorModel.color_single)
app.post('/Admin/color/color_edit/:id', colorModel.color_update)
app.post('/Admin/color/color_delete/:id', colorModel.color_delete)
app.post('/Admin/color/color_search', colorModel.color_search)
app.get('/Admin/color/color_all/:pageNo/:perPage', colorModel.color_list_paigination)
app.post('/Admin/color/color_copy', colorModel.color_copy)
app.post('/Admin/color/color_pdf', colorModel.color_pdf)


const subCategoryModel = require('../app/model/Admin/sub_category_model/sub_category_model')
app.post('/Admin/sub_category/sub_category_create', subCategoryModel.sub_category_create)
app.get('/Admin/sub_category/sub_category_all', subCategoryModel.sub_category_list)
app.get('/Admin/sub_category/sub_category_all/:id', subCategoryModel.sub_category_single)
app.post('/Admin/sub_category/sub_category_edit/:id', subCategoryModel.sub_category_update)
app.post('/Admin/sub_category/sub_category_delete/:id', subCategoryModel.sub_category_delete)
app.post('/Admin/sub_category/sub_category_search', subCategoryModel.sub_category_search)
app.get('/Admin/sub_category/sub_category_all/:pageNo/:perPage', subCategoryModel.sub_category_list_paigination)
app.post('/Admin/sub_category/sub_category_copy', subCategoryModel.sub_category_copy)
app.post('/Admin/sub_category/sub_category_pdf', subCategoryModel.sub_category_pdf)



const materialModel = require('../app/model/Admin/material_model/material_model')
app.post('/Admin/material/material_create', materialModel.material_create)
app.get('/Admin/material/material_all', materialModel.material_list)
app.get('/Admin/material/material_all/:id', materialModel.material_single)
app.post('/Admin/material/material_edit/:id', materialModel.material_update)
app.post('/Admin/material/material_delete/:id', materialModel.material_delete)
app.post('/Admin/material/material_search', materialModel.material_search)
app.get('/Admin/material/material_all/:pageNo/:perPage', materialModel.material_list_paigination)
app.post('/Admin/material/material_copy', materialModel.material_copy)
app.post('/Admin/material/material_pdf', materialModel.material_pdf)

const typeModel = require('../app/model/Admin/type_model/type_model')
app.post('/Admin/type/type_create', typeModel.type_create)
app.get('/Admin/type/type_all', typeModel.type_list)
app.get('/Admin/type/type_all/:id', typeModel.type_single)
app.post('/Admin/type/type_edit/:id', typeModel.type_update)
app.post('/Admin/type/type_delete/:id', typeModel.type_delete)
app.post('/Admin/type/type_search', typeModel.type_search)
app.get('/Admin/type/type_all/:pageNo/:perPage', typeModel.type_list_paigination)
app.post('/Admin/type/type_copy', typeModel.type_copy)
app.post('/Admin/type/type_pdf', typeModel.type_pdf)


const modelModel = require('../app/model/Admin/model_model/model_model')
app.post('/Admin/model/model_create', modelModel.model_create)
app.get('/Admin/model/model_all', modelModel.model_list)
app.get('/Admin/model/model_all/:id', modelModel.model_single)
app.post('/Admin/model/model_edit/:id', modelModel.model_update)
app.post('/Admin/model/model_delete/:id', modelModel.model_delete)
app.post('/Admin/model/model_search', modelModel.model_search)
app.get('/Admin/model/model_all/:pageNo/:perPage', modelModel.model_list_paigination)
app.post('/Admin/model/model_copy', modelModel.model_copy)
app.post('/Admin/model/model_pdf', modelModel.model_pdf)



const periodModel = require('../app/model/Admin/period_model/period_model')
app.post('/Admin/period/period_create', periodModel.period_create)
app.get('/Admin/period/period_all', periodModel.period_list)
app.get('/Admin/period/period_all/:id', periodModel.period_single)
app.post('/Admin/period/period_edit/:id', periodModel.period_update)
app.post('/Admin/period/period_delete/:id', periodModel.period_delete)
app.post('/Admin/period/period_search', periodModel.period_search)
app.get('/Admin/period/period_all/:pageNo/:perPage', periodModel.period_list_paigination)
app.post('/Admin/period/period_copy', periodModel.period_copy)
app.post('/Admin/period/period_pdf', periodModel.period_pdf)


const unitModel = require('../app/model/Admin/unit_model/unit_model')
app.post('/Admin/unit/unit_create', unitModel.unit_create)
app.get('/Admin/unit/unit_all', unitModel.unit_list)
app.get('/Admin/unit/unit_all/:id', unitModel.unit_single)
app.post('/Admin/unit/unit_edit/:id', unitModel.unit_update)
app.post('/Admin/unit/unit_delete/:id', unitModel.unit_delete)
app.post('/Admin/unit/unit_search', unitModel.unit_search)
app.get('/Admin/unit/unit_all/:pageNo/:perPage', unitModel.unit_list_paigination)
app.post('/Admin/unit/unit_copy', unitModel.unit_copy)
app.post('/Admin/unit/unit_pdf', unitModel.unit_pdf)


const path = require('path');

app.get('/get-css/:file', (req, res) => {
  const cssFileName = req.params.file;
  const cssFilePath = path.join(__dirname, 'css', cssFileName);

  // Check if the CSS file exists
  if (fs.existsSync(cssFilePath)) {
    const cssContent = fs.readFileSync(cssFilePath, 'utf-8');
    res.type('text/css').send(cssContent);
  } else {
    res.status(404).json({ error: 'CSS file not found' });
  }
});




// var wkhtmltopdf = require('wkhtmltopdf');
// var fs = require("fs");

// wkhtmltopdf.command = "C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe";

// // wkhtmltopdf.command = "C:\\Users\\user\\Desktop\\Ecommerce\\node_modules\\wkhtmltopdf\\index.js";
// const formatString = (str) => {
//   const words = str?.split('_');

//   const formattedWords = words?.map((word) => {
//     const capitalizedWord = word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//     return capitalizedWord;
//   });

//   return formattedWords?.join(' ');
// };

// const { encode } = require('querystring');

// app.post('/generate-pdf', (req, res) => {

//   const { searchResults, selectedColumns } = req.body; // Assuming selectedColumns is an array of column names

//   console.log(searchResults, 'here all the searchResults')
//   const statusLabels = {
//     1: 'Active',
//     2: 'Inactive',
//     3: 'Pending'
//   };

//   let tableRows = '';
//   searchResults?.forEach((result, index) => {
//     let row = '<tr>';
//     selectedColumns.forEach(column => {
//       if (column === 'serial') {
//         row += `<td>${index + 1}</td>`; // Displaying index number starting from 1
//       } else if (column === 'action') {
//         // Skip this column
//       }
//       else if (column === 'status_id') {
//         const statusLabel = statusLabels[result[column]] || '';
//         // Get corresponding label from statusLabels object
//         row += `<td >${statusLabel}</td>`;
//       }
//       else if (column === 'file_path') {
//         // Encode the image URL
//         const encodedURL = encodeURIComponent(result[column]);
//         console.log(`${process.env.NEXT_PUBLIC_API_URL}:5003/${result[column]}`, 'encodedURL welcome')
//         // const encodedURL = encode(result[column]);
//         row += `<td><img src="${process.env.NEXT_PUBLIC_API_URL}:5003/${result[column]}" alt="image" style="max-width: 100px; max-height: 100px;"></td>`;
//       }
      
//       else {
//         row += `<td>${result[column]}</td>`; // Displaying regular columns
//       }
//     });
//     row += '</tr>';
//     tableRows += row;
//   });
//   // <link href='http://sonnetdp.github.io/nikosh/css/nikosh.css' rel='stylesheet' type='text/css'>
//   // <link href='./nikosh.css' rel='stylesheet' type='text/css'>
//   //  ${process.env.NEXT_PUBLIC_API_URL}:5002/get-css/nikosh.css
//   // @import url("nikosh.css");

//   const html = `<html lang="en">
//   <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Document</title>

//       <style>

    
  
//      * { 
//       sheet-size: A4;font-family: 'Nikosh', sans-serif !important;
//      }

//           table {
//               width: 100%;
//               border-collapse: collapse;
//           }
//           th, td {
//               padding: 8px;
//               text-align: left;
//               border: 1px solid #ddd;
//           }
//           th {
//               background-color: #f2f2f2;
//           }
//           img {
//               max-width: 100px;
//               max-height: 100px;
//           }
//           .container {
//             text-align: center;
//         }
//         .container2 {
//           display: flex;
//           justify-content: space-between;
//       }
//       </style>
//   </head>
//   <body>
//  <div class='container'>
//  <h2 style="margin: 0; padding: 0;">Pathshala School & College Period List</h2>
//  <h3 style="margin: 0; padding: 0;">GA-75/A, Middle Badda, Dhaka-1212</h3>
//  <p style="margin: 0; padding: 0;">Phone: 01977379479, Mobile: 01977379479</p>
//  <p style="margin: 0; padding: 0; margin-bottom: 10px">Email: pathshala@urbanitsolution.com</p>
//  <h3 style="margin-bottom: 10px; padding: 0; text-decoration: underline;">Period List</h3>
//  </div>
//  <div class="container2" style:"display: flex;
//  justify-content: space-between;">
//  <p style="margin: 0; padding: 0;">Receipt No: 829</p>
//  <p style="margin: 0; padding: 0;">Collected By:</p>
//  <p style="margin: 0; padding: 0;">Date: </p>
// </div>
//       <table>
//           <thead>
//               <tr>
//                   ${selectedColumns.filter(column => column !== 'action').map(column => {
//     if (column === 'status_id') {
//       return `<th>Status</th>`;
//     }
//     else if (column === 'file_path') {
//       return `<th>File</th>`;
//     }
//     else {
//       return `<th>${formatString(column)}</th>`;
//     }
//   }).join('')}
//               </tr>
//           </thead>
//           <tbody >
//               ${tableRows}
//           </tbody>
//       </table>
//   </body>
//   </html>`;

//   wkhtmltopdf(html, { pageSize: 'letter' }, (err, stream) => {
//     if (err) {
//       console.error('Error generating PDF:', err);
//       res.status(500).send('Error generating PDF');
//       return;
//     }
//     stream.pipe(res);
//   });
// });










const warrantyModel = require('../app/model/Admin/warranty_model/warranty_model')
app.post('/Admin/warranty/warranty_create', warrantyModel.warranty_create)
app.get('/Admin/warranty/warranty_all', warrantyModel.warranty_list)
app.get('/Admin/warranty/warranty_all/:id', warrantyModel.warranty_single)
app.post('/Admin/warranty/warranty_edit/:id', warrantyModel.warranty_update)
app.post('/Admin/warranty/warranty_delete/:id', warrantyModel.warranty_delete)
app.post('/Admin/warranty/warranty_search', warrantyModel.warranty_search)
app.get('/Admin/warranty/warranty_all/:pageNo/:perPage', warrantyModel.warranty_list_paigination)
app.post('/Admin/warranty/warranty_copy', warrantyModel.warranty_copy)
app.post('/Admin/warranty/warranty_pdf', warrantyModel.warranty_pdf)

const moduleSettings = require('../app/model/Admin/module_settings_model/module_settings_model')
app.post('/Admin/module_settings/module_settings_create', moduleSettings.module_setting_create)
app.get('/Admin/module_settings/module_settings_all', moduleSettings.module_setting_list)


app.get('/status/all_status', brandModel.ListStatus)

const productModel = require('../app/model/Admin/product_model/product_model');

app.post('/Admin/product/product_quick_create', productModel.create_quick_product);
app.post('/Admin/product/quick_brand_search', productModel.quick_brand_search);
app.post('/Admin/product/quick_brand_update', productModel.quick_brand_update);

app.post('/Admin/product/quick_category_search', productModel.quick_category_search);
app.post('/Admin/product/quick_category_update', productModel.quick_category_update);
app.post('/Admin/product/product_pdf', productModel.product_pdf);

app.post('/Admin/product/product_create', productModel.product_create);
app.post('/Admin/product/product_search', productModel.product_search)
app.get('/Admin/product/product_list', productModel.product_list)
app.post('/Admin/product/product_edit/:id', productModel.product_update)
app.get('/Admin/product/product_list/:id', productModel.product_single)
app.get('/Admin/product/product_list/:pageNo/:perPage', productModel.product_list_paigination)
app.post('/Admin/product/product_image_settings/product_image_settings_create', productModel.
  product_image_settings)

const expenceCategoryModel = require(`../app/model/Admin/expense_category_model/expense_category_model`)
app.post('/Admin/expence_category/expence_category_create', expenceCategoryModel.expence_category_create);
app.get('/Admin/expence_category/expence_category_all', expenceCategoryModel.expence_category_list);
app.get('/Admin/expence_category/expence_category_all/:id', expenceCategoryModel.expense_category_single);
app.post('/Admin/expence_category/expence_category_edit/:id', expenceCategoryModel.expense_category_update);
app.post('/Admin/expence_category/expence_category_delete/:id', expenceCategoryModel.expense_category_delete);


const expenceModel = require(`../app/model/Admin/expense_model/expense_model`)
app.post('/Admin/expense/expense_create', expenceModel.expence_create)
app.post('/Admin/expense/expense_search', expenceModel.expense_search)
app.get('/Admin/expense/expense_list/:pageNo/:perPage', expenceModel.expense_list_paigination)
app.get('/Admin/expense/expense_list', expenceModel.expence_category_list)
app.post('/Admin/expense/expense_delete/:id', expenceModel.expense_delete)
app.get('/Admin/expense/expense_all', expenceModel.expense_get)
app.get('/Admin/expense/expense_all/:id', expenceModel.expense_getById)
app.post('/Admin/expense/expense_update/:id', expenceModel.expense_update)



const income_category_model = require(`../app/model/Admin/income_category_model/income_category_model`)
app.post('/Admin/income_category/income_category_create', income_category_model.income_category_create);
app.get('/Admin/income_category/income_category_all', income_category_model.income_category_list);
app.get('/Admin/income_category/income_category_all/:id', income_category_model.income_category_single);
app.post('/Admin/income_category/income_category_edit/:id', income_category_model.income_category_update);
app.post('/Admin/income_category/income_category_delete/:id', income_category_model.income_category_delete);


const incomeModel = require(`../app/model/Admin/income_model/income_model`);
app.post('/Admin/income/income_create', incomeModel.income_create);
app.get('/Admin/income/income_list', incomeModel.income_category_list);
app.post('/Admin/income/income_search', incomeModel.income_search);
app.get('/Admin/income/income_list/:pageNo/:perPage', incomeModel.income_list_paigination);
app.post('/Admin/income/income_delete/:id', incomeModel.income_delete);
app.get('/Admin/income/income_all', incomeModel.income_get);
app.get('/Admin/income/income_all/:id', incomeModel.income_getById);
app.post('/Admin/income/income_update/:id', incomeModel.income_update);



const supplierModel = require(`../app/model/Admin/supplier_model/supplier_model`)
app.get('/Admin/supplier/supplier_list', supplierModel.supplier_address_list)
app.get('/Admin/supplier/due_amount/:supplier_id', supplierModel.supplier_due_amount)











const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




app.get('/calculateAmounts', (req, res) => {
  // Query to calculate total payable amount
  const payableQuery = 'SELECT SUM(payable_amount) AS total_payable FROM expense';
  db.query(payableQuery, (err, payableResults) => {
    if (err) {
      console.error('Error calculating total payable amount: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    const totalPayable = payableResults[0].total_payable || 0;

    // Query to calculate total paid amount
    const paidQuery = 'SELECT SUM(paid_amount) AS total_paid FROM expense';
    db.query(paidQuery, (err, paidResults) => {
      if (err) {
        console.error('Error calculating total paid amount: ' + err.stack);
        res.status(500).send('Internal Server Error');
        return;
      }

      const totalPaid = paidResults[0].total_paid || 0;

      // Respond with JSON containing total payable and total paid amounts
      res.json({
        totalPayable: totalPayable,
        totalPaid: totalPaid
      });
    });
  });
});





app.post('/reset-password/:id', (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Hash the new password
  const hashedPassword = crypto.createHash('sha1').update(newPassword).digest('hex');

  // Check the current password in the database
  const checkPasswordQuery = 'SELECT password FROM users WHERE id = ?';

  db.query(checkPasswordQuery, [req.params.id], (checkError, checkResults) => {
    if (checkError) {
      console.log('Error checking current password:', checkError);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if the current password matches the one in the database
    // const storedPassword = checkResults[0].password;
    // const hashedPasswords = sha1(currentPassword);
    // if (storedPassword !== hashedPasswords) {
    //   console.log('Current password does not match');
    //   res.status(400).send('Current password is incorrect');
    //   return;
    // }

    // Update the password in the database
    // const updatePasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';
    const updatePasswordQuery = 'UPDATE users SET password = ?, pass_reset = NULL WHERE id = ?';

    db.query(updatePasswordQuery, [hashedPassword, req.params.id], (updateError, updateResults) => {
      if (updateError) {
        console.log('Error resetting password:', updateError);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Password reset successfully');
        res.status(200).send('Password reset successfully');
      }
    });
  });
});






app.get('/api/menu', (req, res) => {
  fetchMenuData(null, (err, result) => {
    if (err) {
      console.error('Error fetching menu data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});

// Recursive function to fetch hierarchical data
function fetchMenuData(parentId, callback) {
  const query = `
    SELECT
      id,
      title_en,
      title_bn,
      link_path,
      link_path_type,
      active,
      parent_id,
      admin_template_menu_id,
      menu_icon,
      icon_align,
      content_en
    FROM
      admin_template_menu
    WHERE
      parent_id ${parentId ? `= ${parentId}` : 'IS NULL'}
  `;

  db.query(query, (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }

    const menuItems = [];

    // Iterate through the rows
    for (const row of rows) {
      const menuItem = {
        id: row.id,
        title_en: row.title_en,
        title_bn: row.title_bn,
        link_path: row.link_path,
        link_path_type: row.link_path_type,
        active: row.active,
        parent_id: row.parent_id,
        admin_template_menu_id: row.admin_template_menu_id,
        menu_icon: row.menu_icon,
        icon_align: row.icon_align,
        content_en: row.content_en,
        children: [], // Recursive call to fetch children
      };

      fetchMenuData(row.id, (err, children) => {
        if (err) {
          callback(err, null);
          return;
        }

        menuItem.children = children;
        menuItems.push(menuItem);

        // If this is the last row, call the callback
        if (menuItems.length === rows.length) {
          callback(null, menuItems);
        }
      });
    }

    // If there are no rows, call the callback
    if (rows.length === 0) {
      callback(null, menuItems);
    }
  });
}




app.post('/insertData', (req, res) => {
  const items = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const insertMenuData = (menuData, parentId = null) => {
    menuData.forEach(menu => {
      const { children, ...menuWithoutChildren } = menu;
      const dataToInsert = { ...menuWithoutChildren, parent_id: parentId };

      db.query('INSERT INTO admin_template_menu SET ?', dataToInsert, (error, results, fields) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        const newParentId = results.insertId;

        if (children && Array.isArray(children) && children.length > 0) {
          insertMenuData(children, newParentId);
        }
      });
    });
  };

  insertMenuData(items);

  res.status(200).json({ success: true });
});









app.get('/', (req, res) => {
  res.send('Server running saklain mostak')
})


const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})



