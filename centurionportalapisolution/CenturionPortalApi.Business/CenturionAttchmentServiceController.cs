using CenturionAttachmentService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class CenturionAttachmentServiceController
    {
        private static AttachmentServiceClient getAttachmentServiceClient(string Enterpriseurl = "")
        {
            AttachmentServiceClient client = new AttachmentServiceClient();
            string endpointService = "/AttachmentService.svc";
            if (!string.IsNullOrEmpty(Enterpriseurl))
                client = new AttachmentServiceClient(
                      AttachmentServiceClient.EndpointConfiguration.Default, Enterpriseurl + endpointService
                   );

            return client;
        }

        private static void closePaymentFunctionServiceClient(AttachmentServiceClient client)
        {
            if (client != null)
            {
                try
                {
                    // Cierre siempre el cliente.
                    client.CloseAsync();
                }
                catch { }
            }
        }


        public static async Task<string> GetAttachment(string enterpriseURL, string filePath)
        {
            byte[] dataFile = null;
            string dataCode64 = string.Empty;
            AttachmentServiceClient client = null;

            try
            {
                client = getAttachmentServiceClient(enterpriseURL);
                dataFile = await client.SecureDownloadAsync(filePath, false, null, null, null, false, null, false);
                dataCode64 = Convert.ToBase64String(dataFile);
            }
            catch (Exception ex)
            {
                dataCode64 = string.Empty;

                /*
                if (ex.GetType() == typeof(System.ServiceModel.FaultException)
                    && ((System.ServiceModel.FaultException)ex).Code.Name == "CreatedException")
                {
                    //En Teoria si entra aqui es una validacion asi que deberia mostrarse el Message de la validacion
                    //var messageValidation = ex.Message;
                    ex.Data["isValidation"] = true;
                    throw ex;
                }
                else
                    throw ex;

                */
            }
            finally
            {
                closePaymentFunctionServiceClient(client);
            }

            return dataCode64;
        }

    }
}
