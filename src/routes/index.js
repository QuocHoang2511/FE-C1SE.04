
import ContactAdmin from "../pages/admin/Contact/Contact";
import Diet from "../pages/admin/Diet/Diet";
import CategoryExercise from "../pages/admin/Exercise/CategoryExercise";
import Exercise from "../pages/admin/Exercise/Exercise";
import Topic from "../pages/admin/Topic/Topic";
import HealthInfomation from "../pages/health/HealthInfomation";
import HistoryHealth from "../pages/health/HistoryHealth";
import {
  Home,
  Login,
  SignUp,
  AboutPage,
  ForgotPassword,
  ResetPassword,
  QR_Code,
  HealthExercises,
  Profile,
  Favorites,
  ChangePassword,
  BloodDonation,
  MenuFood,
  ExerciseDetail,
  Account,
  Dashboard,
  Event,
  BloodGroup,
  Contact,
} from "../pages/index";
import FoodDetail from "../pages/menuFood/FoodDetail";
const router = [
  { path: "/", component: Home }, 
  { path: "/login", component: Login },//
  { path: "/signup", component: SignUp },//
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/change-password/:userId", component: ResetPassword },
  { path: "/qr-code", component: QR_Code },
  { path: "/healthExercises", component: HealthExercises },//
  { path: "/exerciseDetail", component: ExerciseDetail },//
  { path: "/exrcise/:exercisId", component: ExerciseDetail },//
  { path: "/profile", component: Profile },//
  { path: "/favorites", component: Favorites },//
  { path: "/changePassword", component: ChangePassword },//
  { path: "/about", component: AboutPage },//
  { path: "/contact", component: Contact },//
  { path: "/bloodDonation", component: BloodDonation },//
  { path: "/menu-food", component: MenuFood },//
  { path: "/food/:foodId", component: FoodDetail },//
  { path: "/health/:userId", component: HealthInfomation },//
  { path: "historyHealth", component: HistoryHealth },//

  { path: "/admin/acount", component: Account },//
  { path: "/admin/dashboard", component: Dashboard },//
  { path: "/admin/bloodGroup", component: BloodGroup },//
  { path: "/admin/categoryExercise", component: CategoryExercise },//
  { path: "/admin/exercise", component: Exercise },//
  { path: "/admin/diet", component: Diet },//
  { path: "/admin/topic", component: Topic },//
  { path: "/admin/contact", component: ContactAdmin },//

  { path: "/admin/event", component: Event },//
];

export { router };
