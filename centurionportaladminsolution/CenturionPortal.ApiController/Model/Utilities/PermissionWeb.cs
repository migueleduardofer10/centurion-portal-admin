namespace CenturionPortal.ApiController.Model.Utilities
{
    public class PermissionWeb
    {
        public int Bit { get; set; }
        public string Uid { get; set; }
        public string Description { get; set; }
        public bool HasChildren { get; set; }
        public bool IsGranted { get; set; }
        public string ParentUid { get; set; }

        public static string QueryForSelectGraphQL
        {
            get
            {
                return @"bit,
                    uid,
                    description,
                    hasChildren,
                    isGranted,
                    parentUid
                    ";
            }
        }
    }
}
