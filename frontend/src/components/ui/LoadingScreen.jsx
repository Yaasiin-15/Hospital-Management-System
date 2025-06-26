@@ .. @@
 const LoadingScreen = ({ message = 'Loading your dashboard...' }) => {
   return (
   )
 }
-    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 z-50">
+    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 z-50 transition-colors">
       <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
         <Activity className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-pulse" />
       </div>