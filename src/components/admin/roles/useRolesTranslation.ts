
import { useLanguage } from "@/context/LanguageContext";

export const useRolesTranslation = () => {
  const { language } = useLanguage();

  // Translation helper
  const t = (key: string, fallback: string): string => {
    return language === 'en' ? fallback : getFallbackSpanish(key, fallback);
  };

  // Simple Spanish translations fallback
  const getFallbackSpanish = (key: string, fallback: string): string => {
    const spanishMap: Record<string, string> = {
      "Roles Management": "Gestión de Roles",
      "Manage system roles and their permissions": "Gestiona los roles del sistema y sus permisos",
      "Add Role": "Añadir Rol",
      "Search roles...": "Buscar roles...",
      "All": "Todos",
      "Active": "Activos",
      "Inactive": "Inactivos",
      "Role": "Rol",
      "Description": "Descripción",
      "Status": "Estado",
      "Users": "Usuarios",
      "Permissions": "Permisos",
      "Actions": "Acciones",
      "Edit": "Editar",
      "Delete": "Eliminar",
      "No roles found": "No se encontraron roles",
      "Create Role": "Crear Rol",
      "Add a new role to the system": "Añade un nuevo rol al sistema",
      "Role Name": "Nombre del Rol",
      "Role Description": "Descripción del Rol",
      "Describe the role's purpose and limitations": "Describe el propósito y las limitaciones del rol",
      "Enter role name": "Ingrese el nombre del rol",
      "Enter role description": "Ingrese la descripción del rol",
      "Cancel": "Cancelar",
      "Create": "Crear",
      "Are you sure?": "¿Está seguro?",
      "This will permanently delete the role. This action cannot be undone.": "Esto eliminará permanentemente el rol. Esta acción no se puede deshacer.",
      "Role created successfully": "Rol creado con éxito",
      "Role updated successfully": "Rol actualizado con éxito",
      "Role deleted successfully": "Rol eliminado con éxito",
      "Please fill all required fields": "Por favor complete todos los campos requeridos",
      "Edit Role": "Editar Rol",
      "Update role information": "Actualizar información del rol",
      "Update": "Actualizar",
      "View Permissions": "Ver Permisos",
      "Default": "Predeterminado",
      "Cannot delete default role": "No se puede eliminar el rol predeterminado"
    };
    
    return spanishMap[fallback] || fallback;
  };

  return { t };
};
