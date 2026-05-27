
const fs = require("fs");
const filePath = "d:/Rakesh React/Horse/Horse Riding/src/pages/admin/AdminUsers.jsx";
let content = fs.readFileSync(filePath, "utf8");

// 1. Add state for previewImage
if (!content.includes("const [previewImage, setPreviewImage]")) {
  content = content.replace(
    "const [showProfileModal, setShowProfileModal] = useState(false);",
    "const [showProfileModal, setShowProfileModal] = useState(false);\n  const [previewImage, setPreviewImage] = useState(null);"
  );
}

// 2. Replace the anchor tag in Registration Documents with a button
const startDocs = "              {/* Registration Documents */}";
const endDocs = "              {/* Club Info */}";

let docsSection = content.substring(content.indexOf(startDocs), content.indexOf(endDocs));

const oldAnchor = `                          <a
                            key={key}
                            href={selectedUser.documents[key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-white border border-blue-100 rounded-xl px-4 py-3 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                          >`;

const newButton = `                          <button
                            key={key}
                            onClick={() => setPreviewImage(selectedUser.documents[key])}
                            className="flex items-center justify-between w-full bg-white border border-blue-100 rounded-xl px-4 py-3 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                          >`;

docsSection = docsSection.replace(oldAnchor, newButton).replace("</a>", "</button>");
docsSection = docsSection.replace(oldAnchor, newButton).replace("</a>", "</button>"); // replace multiple just in case, though there is only one map

content = content.substring(0, content.indexOf(startDocs)) + docsSection + content.substring(content.indexOf(endDocs));

// 3. Add the modal at the very end before the last </div>
const modalHTML = `
      {/* Lightbox Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-w-5xl w-full max-h-[95vh] flex items-center justify-center">
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/20 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <RiCloseLine size={24} />
            </button>
            <img src={previewImage} alt="Document Preview" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" />
          </div>
        </div>
      )}
`;

content = content.replace("    </div>\n  );\n};\n\nexport default AdminUsers;", modalHTML + "    </div>\n  );\n};\n\nexport default AdminUsers;");

fs.writeFileSync(filePath, content, "utf8");
console.log("Lightbox added!");

