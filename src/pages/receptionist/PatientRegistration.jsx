@@ .. @@
         {/* Personal Information */}
         <Card>
           <div className="p-6">
-            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
-            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
+            <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">Personal Information</h3>
+            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
               <Input
                 label="First Name"
                 name="firstName"
@@ .. @@
         {/* Contact Information */}
         <Card>
           <div className="p-6">
-            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
-            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
+            <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">Contact Information</h3>
+            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
               <Input
                 label="Phone Number"
                 name="phone"
@@ .. @@
-              <div className="md:col-span-2">
+              <div className="col-span-1 md:col-span-2">
                 <Input
                   label="Address"
                   name="address"
@@ .. @@
         {/* Emergency Contact */}
         <Card>
           <div className="p-6">
-            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
-            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
+            <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">Emergency Contact</h3>
+            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
               <Input
                 label="Contact Name"
                 name="emergencyContactName"
@@ .. @@
-            <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
-            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
+            <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">Insurance Information</h3>
+            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
               <Input
                 label="Insurance Provider"
                 name="insurance"