const router = express.Router();
const authController = require("../controller/authController");

router.route("/").POST(authController.signUp);
