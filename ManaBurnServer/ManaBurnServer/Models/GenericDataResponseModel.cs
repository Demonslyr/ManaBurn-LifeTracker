namespace ManaBurnServer.Models
{
    public class GenericDataResponseModel<T> : GenericResponseModel
    {
        public T Data { get; set; }
    }
}