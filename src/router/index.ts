import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RegisterViewVue from '../views/RegisterView.vue';
import LoginViewVue from '../views/LoginView.vue';
import HomeViewVue from "../views/HomeView.vue";
import UsersViewVue from "../views/UsersView.vue";
import UserEditView from "../views/UserEditView.vue";
import RecordView from "../views/RecordView.vue";
import OfuscacionView from "../views/OfuscacionView.vue";
import MySqlView from "../views/MySqlView.vue";
import PostgreSqlView from "../views/PostgreSqlView.vue";
import SqlLiteView from "../views/SqlLiteView.vue";
import SqlServerView from "../views/SqlServerView.vue";
import OracleView from "../views/OracleView.vue";
import MysqlDataView from "@/views/MysqlDataView.vue";
import PostgresDataView from "@/views/PostgresDataView.vue";
import MongoDBView from "@/views/MongoDBView.vue";
import DB2View from "@/views/DB2View.vue";
import ProgressView from "@/views/ProgressView.vue";
import PostgreSqlDataView from "@/views/PostgreSqlDataView.vue";
import SqlServerDataView from "@/views/SqlServerDataView.vue";
import MongoDBDataView from "@/views/MongoDBDataView.vue";
import SqlLiteDataView from '@/views/SqlLiteDataView.vue';
import BMySqlView from "@/views/BMySqlView.vue";
import BPostgreSqlView from "@/views/BPostgreSqlView.vue";
import BOracleView from "@/views/BOracleView.vue";
import BSqlLiteView from "@/views/BSqlLiteView.vue";
import BSqlServerView from "@/views/BSqlServerView.vue";
import BProgressView from "@/views/BProgressView.vue";
import BMongoDbView from "@/views/BMongoDbView.vue";
import BDb2View from "@/views/BDb2View.vue";
import EMysqlDataView from "@/views/EMysqlDataView.vue";
import EPostgresqlDataView from "@/views/EPostgresqlDataView.vue";
import OfuscateDataView from "@/views/OfuscateDataView.vue";



const routes: Array<RouteRecordRaw> = [
    {
        path: '/', 
        name: 'login',
        component: LoginViewVue
    },
    
    {
        path: '/registro', 
        name: 'registro',
        component: RegisterViewVue,
        meta: { requiresAuth: true } 
        
    },

    {
        path: '/inicio',
        name: 'inicio',
        component: HomeViewVue,
        meta: { requiresAuth: true } 
        
    },

    {
        path: '/usuarios',
        name: 'usuarios',
        component: UsersViewVue,
        meta: { requiresAuth: true } 
       
    },

    {
        path: '/editar-usuario/:id_usuario', // El parámetro está definido en la ruta
        name: 'editar-usuario',
        component: UserEditView,
        meta: { requiresAuth: true } 
        
    },

    {
        path: '/bitacora',
        name: 'bitacora',
        component: RecordView,
        meta: { requiresAuth: true } 
       
    },

    {
        path: '/ofuscacion',
        name: 'ofuscacion',
        component: OfuscacionView,
        meta: { requiresAuth: true } 
       
    },

    {
        path: '/mysql',
        name: 'mysql',
        component: MySqlView,
        meta: { requiresAuth: true}
    },

    {
        path: '/PostgreSql',
        name: 'PostgreSql',
        component: PostgreSqlView,
        meta: { requiresAuth: true}
    },

    {
        path: '/Oracle',
        name: 'Oracle',
        component: OracleView,
        meta: { requiresAuth: true}
    },

    {
        path: '/SqlLite',
        name: 'SqlLite',
        component: SqlLiteView,
        meta: { requiresAuth: true}
    },

    {
        path: '/SqlLiteDataView',
        name: 'SqlLiteDataView',
        component: SqlLiteDataView,
        meta: { requiresAuth: true}
    },

    {
        path: '/SqlServer',
        name: 'SqlServer',
        component: SqlServerView,
        meta: { requiresAuth: true}
    },
    
    {
        path: '/mysql-datos',
        name: 'mysql-datos',
        component: MysqlDataView,
        meta: { requiresAuth: true}
    },

    {
        path: '/postgresql-datos',
        name: 'postgresql-datos',
        component: PostgreSqlDataView,
        meta: { requiresAuth: true}
    },

    {
        path: '/sqlserver-datos',
        name: 'sqlserver-datos',
        component: SqlServerDataView,
        meta: { requiresAuth: true}
    },

    {
        path: '/MongoDB',
        name: 'MongoDB',
        component: MongoDBView,
        meta: { requiresAuth: true}
    },

    {
        path: '/mongodb-datos/:dbName',
        name: 'mongodb-datos',
        component: MongoDBDataView,
        meta: { requiresAuth: true }
    },

    {
        path: '/DB2',
        name: 'DB2',
        component: DB2View,
        meta: { requiresAuth: true}
    },

    {
        path: '/Progress',
        name: 'Progress',
        component: ProgressView,
        meta: { requiresAuth: true}
    },
    {
    path: '/BMySql',
    name: 'BMySql',
    component: BMySqlView,
    meta: { requiresAuth: true}
},

{
    path: '/BPostgreSql',
    name: 'BPostgreSql',
    component: BPostgreSqlView,
    meta: { requiresAuth: true}
},

{
    path: '/BOracle',
    name: 'BOracle',
    component: BOracleView,
    meta: { requiresAuth: true}
},

{
    path: '/BSqlLite',
    name: 'BSqlLite',
    component: BSqlLiteView,
    meta: { requiresAuth: true}
},

{
    path: '/BSqlServer',
    name: 'BSqlServer',
    component: BSqlServerView,
    meta: { requiresAuth: true}
},
{
    path: '/BProgress',
    name: 'BProgress',
    component: BProgressView,
    meta: { requiresAuth: true}
},
{
    path: '/BMongoDb',
    name: 'BMongoDb',
    component: BMongoDbView,
    meta: { requiresAuth: true}
},
{
    path: '/BDb2',
    name: 'BDb2',
    component: BDb2View,
    meta: { requiresAuth: true}
},

{
    path: '/editar-mysql/:id_conexion', // El parámetro está definido en la ruta
    name: 'editar-mysql',
    component: EMysqlDataView,
    meta: { requiresAuth: true } 
    
},

{
    path: '/editar-postgresql/:id_conexion', // El parámetro está definido en la ruta
    name: 'editar-postgresql',
    component: EPostgresqlDataView,
    meta: { requiresAuth: true } 
    
},

{
    path: '/datos-ofuscados', 
    name: 'OfuscateData',
    component: OfuscateDataView,
    meta: { requiresAuth: true } 
    
},

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(async (to, from, next) => {
    // Verificar si la ruta requiere autenticación y si el usuario no está autenticado
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        // Redirigir al usuario al inicio de sesión
        next({ name: 'login' });
    } else {
        // Si el usuario está autenticado o la ruta no requiere autenticación, permitir el acceso
        next();
    }
});

export default router;