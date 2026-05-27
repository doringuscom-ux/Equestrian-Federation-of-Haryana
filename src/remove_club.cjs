
const fs = require("fs");

// 1. ProfilePage.jsx
let profilePath = "d:/Rakesh React/Horse/Horse Riding/src/pages/ProfilePage.jsx";
let profileContent = fs.readFileSync(profilePath, "utf8");

// Remove the Club tab from the tabs array
profileContent = profileContent.replace("{ id: \"club\", label: \"Club Details\", icon: <RiShieldStarLine /> },\n", "");

// Remove the club section block
const startClubProfile = "              {activeTab === \"club\" && (";
const endClubProfile = "              {activeTab === \"contact\" && (";

if (profileContent.includes(startClubProfile)) {
  let before = profileContent.substring(0, profileContent.indexOf(startClubProfile));
  let after = profileContent.substring(profileContent.indexOf(endClubProfile));
  fs.writeFileSync(profilePath, before + after, "utf8");
}

// 2. AdminUsers.jsx
let adminPath = "d:/Rakesh React/Horse/Horse Riding/src/pages/admin/AdminUsers.jsx";
let adminContent = fs.readFileSync(adminPath, "utf8");

const startClubAdmin = "              {/* Club Info */}";
const endClubAdmin = "            </div>\n          </div>\n        </div>";

if (adminContent.includes(startClubAdmin)) {
  let before = adminContent.substring(0, adminContent.indexOf(startClubAdmin));
  // Need to find the exact end block. The modal closes with </div></div></div>
  let after = adminContent.substring(adminContent.indexOf("            </div>\n          </div>\n        </div>", adminContent.indexOf(startClubAdmin)));
  fs.writeFileSync(adminPath, before + after, "utf8");
}

// 3. RegisterPage.jsx
let registerPath = "d:/Rakesh React/Horse/Horse Riding/src/pages/RegisterPage.jsx";
let registerContent = fs.readFileSync(registerPath, "utf8");

// Remove clubInfo from state
registerContent = registerContent.replace("    clubInfo: {\n      clubName: \"\",\n      contactPerson: \"\",\n    },\n", "");

// Remove club validation
registerContent = registerContent.replace("        if (!formData.clubInfo.clubName) newErrors.clubName = true;\n        if (!formData.clubInfo.contactPerson) newErrors.contactPerson = true;\n", "");

// Remove clubInfo from payload
registerContent = registerContent.replace("        clubInfo: formData.clubInfo,\n", "");

// Remove section 3 Club Details
const startClubReg = "                      {/* Step 3: Club Details */}\n                      <div className={`transition-all duration-500 absolute w-full ${step === 3 ? \"opacity-100 translate-x-0 relative z-10\" : \"opacity-0 translate-x-12 pointer-events-none\"}`}>";
const endClubReg = "                      {/* Step 4: Guardian Info */}\n";

if (registerContent.includes(startClubReg)) {
  let before = registerContent.substring(0, registerContent.indexOf(startClubReg));
  let after = registerContent.substring(registerContent.indexOf(endClubReg));
  // Adjust the step numbers in the comments, and conditions
  // Wait, if I remove step 3, then Guardian becomes step 3, Password becomes step 4, etc.
  // Instead of completely breaking the stepper logic, it is safer to just use regex to replace step numbers.
  // Let us write this part manually or carefully.
  fs.writeFileSync(registerPath, before + after, "utf8");
}

console.log("Club details removed from Profile and Admin. Register page partial.");

